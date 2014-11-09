<#escape x as x?html>
<!DOCTYPE html>
<html>
<head>
<#include "../wrap/common.ftl">
<meta charset="utf-8"/>
<title>demo模板</title>

<@css/>
<!-- @STYLE -->
<link rel="stylesheet" type="text/css" href="/src/css/index.css">
</head>
<body id="index-netease-com">
<#include "../wrap/top.ftl">
<div class="g-bd f-cb">
    <div class="g-sd">
       <div>侧边栏</div>
    </div>
    <div class="g-mn1">
      <div class="g-mn1c">
      	内容区
      </div>
    </div>
</div>
<@footer/>
<#noparse>
<!-- @SCRIPT -->
</#noparse>
<!-- @DEFINE -->
<script src="${jslib}define.js?pro=${jspro}"></script>
<script src="${jspro}page/index.js"></script>
</body>
</html>
</#escape>