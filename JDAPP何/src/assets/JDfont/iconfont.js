!(function(a) {
  var e,
    l =
      '<svg><symbol id="icon-jingdong" viewBox="0 0 1024 1024"><path d="M674.922667 907.648l-139.648 0-93.098667 0 0-93.098667L442.176 209.450667 442.176 116.352l93.098667 0 139.648 0C867.712 116.352 1024 293.504 1024 512S867.712 907.648 674.922667 907.648zM674.922667 209.450667l-139.648 0 0 605.077333 139.648 0c141.376 0 256-135.466667 256-302.549333C930.922667 344.896 816.298667 209.450667 674.922667 209.450667zM46.549333 907.648 0 907.648l0-93.098667 46.549333 0c102.826667 0 186.197333-83.349333 186.197333-186.197333l0-512 93.098667 0 0 512C325.824 782.592 200.789333 907.648 46.549333 907.648z"  ></path></symbol><symbol id="icon-vertical_line" viewBox="0 0 1024 1024"><path d="M531.185456 943.532317c0 8.899694-6.493901 16.114003-14.503319 16.114003l-9.364275 0c-8.010441 0-14.504342-7.214309-14.504342-16.114003L492.81352 80.46666c0-8.898671 6.493901-16.114003 14.504342-16.114003l9.364275 0c8.009418 0 14.503319 7.215332 14.503319 16.114003L531.185456 943.532317z"  ></path></symbol><symbol id="icon-sousuo" viewBox="0 0 1024 1024"><path d="M888.703059 847.158363 733.373365 691.826622c50.040696-59.650565 80.190367-136.551002 80.190367-220.507136 0-189.613522-153.703661-343.318206-343.31616-343.318206-189.616592 0-343.31923 153.703661-343.31923 343.318206s153.703661 343.318206 343.31923 343.318206c85.053118 0 162.867368-30.94171 222.838228-82.163301l155.141406 155.141406c11.174504 11.17655 29.300326 11.17655 40.47483 0C899.859144 876.440269 899.859144 858.334913 888.703059 847.158363zM470.248595 757.416456c-158.006663 0-286.10004-128.090307-286.10004-286.097994 0-158.006663 128.093377-286.099017 286.10004-286.099017s286.079574 128.093377 286.079574 286.099017C756.32817 629.326149 628.254236 757.416456 470.248595 757.416456z"  ></path></symbol><symbol id="icon-caidan" viewBox="0 0 1024 1024"><path d="M160 172.462933h704a32 32 0 1 1 0 64h-704a32 32 0 1 1 0-64z m0 320h704a32 32 0 0 1 0 64h-704a32 32 0 1 1 0-64z m0 298.666667h704a32 32 0 0 1 0 64h-704a32 32 0 1 1 0-64z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName("script"))[
      e.length - 1
    ].getAttribute("data-injectcss");
  if (t && !a.__iconfont__svg__cssinject__) {
    a.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
        setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener("DOMContentLoaded", t, !1), e();
        };
        document.addEventListener("DOMContentLoaded", t, !1);
      }
    else
      document.attachEvent &&
        ((o = e),
        (i = a.document),
        (c = !1),
        (l = function() {
          try {
            i.documentElement.doScroll("left");
          } catch (e) {
            return void setTimeout(l, 50);
          }
          n();
        })(),
        (i.onreadystatechange = function() {
          "complete" == i.readyState && ((i.onreadystatechange = null), n());
        }));
    function n() {
      c || ((c = !0), o());
    }
    var o, i, c, l;
  })(function() {
    var e, t, n, o, i, c;
    ((e = document.createElement("div")).innerHTML = l),
      (l = null),
      (t = e.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (n = t),
        (o = document.body).firstChild
          ? ((i = n), (c = o.firstChild).parentNode.insertBefore(i, c))
          : o.appendChild(n));
  });
})(window);
