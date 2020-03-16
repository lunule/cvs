# ClearViewSys rate plugins - jQuery and WordPress versions

* CVS Calculator
* CVS Rates Table
* CVS Rateboard
* CVS Marquee

## Making it work on mobile browsers as well

### HTML meta update

```HTML
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

### .htaccess update

```ApacheConf
<IfModule mod_headers.c>
  Header set Cache-Control "no-cache, no-store, must-revalidate"
  Header set Pragma "no-cache"
  Header set Expires 0
</IfModule>
```
