/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

/**
 * TOC active highlight on scroll.
 * Finds all headings in the article, watches scroll position,
 * and marks the corresponding TOC link as .toc-active.
 */
function initTocHighlight() {
  var $tocs = $("#toc, #toc-footer");
  if (!$tocs.length) return;

  // Collect all anchor links inside TOC (skip the top-level h1 link which is hidden)
  var $tocLinks = $tocs.find("a.toc-link").filter(function() {
    return $(this).closest(".toc-level-1").length === 0 ||
           !$(this).parent().hasClass("toc-level-1");
  });

  if (!$tocLinks.length) return;

  // Build a map: href -> [tocLink elements]  (same anchor may appear in desktop + mobile)
  var anchors = [];
  $tocLinks.each(function() {
    var href = $(this).attr("href");
    if (href && href.charAt(0) === "#") {
      var id = decodeURIComponent(href.slice(1));
      var existing = anchors.find(function(a) { return a.id === id; });
      if (existing) {
        existing.links.push(this);
      } else {
        anchors.push({ id: id, links: [this] });
      }
    }
  });

  if (!anchors.length) return;

  function getHeadingTop(id) {
    // Try by id attribute first, then by name (legacy anchors)
    var $el = $("#" + $.escapeSelector(id));
    if (!$el.length) $el = $("[name='" + id + "']");
    return $el.length ? $el.offset().top : Infinity;
  }

  function onScroll() {
    var scrollTop = $(window).scrollTop();
    var offset = 80; // px — how early to activate before reaching heading

    var activeId = null;
    for (var i = anchors.length - 1; i >= 0; i--) {
      var headingTop = getHeadingTop(anchors[i].id);
      if (scrollTop + offset >= headingTop) {
        activeId = anchors[i].id;
        break;
      }
    }

    // Update classes
    $tocLinks.removeClass("toc-active");
    if (activeId) {
      anchors.forEach(function(a) {
        if (a.id === activeId) {
          a.links.forEach(function(link) {
            $(link).addClass("toc-active");
          });
        }
      });
    }
  }

  $(window).on("scroll.tocHighlight", onScroll);
  onScroll(); // run once on load
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page,
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }

    /**
     * Initialize TOC scroll highlight.
     */
    initTocHighlight();
  }
});
