# hexo-theme-mashiro

这是一个模仿CTeX默认样式的、简洁、学术风格的主题。[预览](https://mashiro.wilsonxia.cn)

如果您决定使用这一主题，请至少阅读完整个使用章节。

## 使用

### 安装

``` sh
# 在站点根目录下操作
cd themes
git clone git@github.com:bill-xia/hexo-theme-mashiro.git mashiro
npm uninstall hexo-renderer-marked # 卸载当前的markdown引擎，如果不是marked需换成当前的markdown引擎
npm install hexo-renderer-markdown-them
```

现在您的主题文件夹`themes`中已经有了一个名为`mashiro`的文件夹。通常情况下，Hexo有两个配置文件：站点配置文件，即站点根目录下的`_config.yml`，以及主题配置文件，即各个主题目录下的`themes/theme-name/_config.yml`(但本主题没有)。

Hexo5.0推出的新功能[替换主题配置文件](https://hexo.io/docs/configuration#Alternate-Theme-Config)允许您在站点根目录建立一个主题配置文件`_config.theme-name.yml`，Hexo会将该文件与主题根目录下的`themes/theme-name/_config.yml`中的配置进行**合并**。为了方便您更新主题，建议您使用这一功能，这样更新主题时只需删除`themes/mashiro`文件夹并重新安装即可。为了防止配置合并带来的麻烦，本主题目录下没有`_config.yml`，取而代之的是`_config.sample.yml`，这样您的配置文件只有站点根目录下的`_config.mashiro.yml`一个。

现在来配置这一功能。在站点根目录中新建文件`_config.mashiro.yml`，并将`themes/mashiro/_config.sample.yml`中的内容粘贴进去。

如果您不想使用这一功能，或者您的`hexo`版本低于5.0且您不希望升级，那么请将`themes/mashiro/_config.sample.yml`重命名为`themes/mashiro/_config.yml`。

理想情况是，在完成上述操作后，您不再需要接触`themes/mashiro`目录中的任何文件。

### 更新

更新主题时，直接删除（或备份）`themes/mashiro`文件夹，再重复安装步骤即可。如果您安装时按照文档将主题配置文件移到了站点根目录下，那么您的配置不会丢失。

更新时本项目将尽量兼容旧的配置文件，如果旧的配置文件失效了，还要麻烦您重新配置一次。一般情况下您不需要编辑配置文件，除非您想要应用一些新功能。

### 站点配置

**站点**配置文件`_config.yml`中需要修改的内容：

``` yml
theme: mashiro
highlight:
  enable: false
```

为了正确地高亮，需要修改`_config.yml`的`highlight enable`为`false`以关闭hexo自带的高亮。

### 部署站点

``` sh
hexo clean
hexo g
hexo deploy
```

## 特性

### Warning

注意：这个主题每次更新后都要求此后访问的用户等待共计800K左右的字体加载，对于一个低带宽的低配服务器而言，这需要一段时间（约1s-5s），这段时间内用户看到的内容各不相同，可能空白，可能是默认无衬线字体字体，也可能是默认衬线字体。如果您不能接受这一点，可能这个主题不适合您。

### 概述

主题支持中文字体压缩，LaTeX数学公式渲染，以及hexo默认主题支持的其他功能（除了sidebar之外，目前我没能把它和我的主题融合起来）。暂时不支持文章目录功能。主题采用了CTeX默认使用的字体，英文为Latin Modern系列，中文正文为汉仪书宋，粗体为方正黑体。（斜体应为楷体，代码区应为仿宋体，我还没有做。）CTeX制作的Fandols系列字体可以显示但无法压缩，我目前无法解决，所以没有用这个系列。

### Markdown渲染

代码高亮：采用Hexo的默认高亮引擎，带有行号，通过主题内的css和浏览器端js实现滚动时行号锁定。

Markdown引擎：通过我为`markdown-it`内嵌一些插件得到的[`markdown-them`引擎](https://github.com/bill-xia/markdown-them)渲染，支持渲染数学公式、Todo-list等。

### 功能及配置

本节的内容都在 `_config.mashiro.yml` 中配置，如有在**站点**配置文件操作的情况会特别指明。

### 导航栏

``` yml
menu:
  Home: /
  Archives: /archives
  # About: /about
```

配置导航栏的条目。冒号前为条目的显示名称，冒号后为链接指向的路径，请使用绝对路径。

#### 关于页

被注释掉的那一行关于页不会被自动生成。如果您想要一个关于页面，可以在`source/`中新建一个名为`about`的文件夹，在这里新建一个名为`index.md`的文件，在其中填入以下内容：

``` markdown
---
title: 关于
layout: about
---

Something about you.
```

### 边栏

``` yml
sidebar: bottom
widgets:
- recent_posts
- category
- tagcloud
```

详见[landscape主题配置](https://github.com/hexojs/hexo-theme-landscape#sidebar)。

### 网站底部信息

```yml
# copyright: |-
#   <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a></br>
#   All website licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0</a></br>
```

在这里填写您希望显示在页面底部的内容，用html书写。这里书写的代码都将不经转义地出现在最终页面上，请小心书写。

如果您不希望显示任何信息，请配置为

``` yml
copyright: |-
  <p></p>
```

如果`copyright`这一项被注释掉了，Hexo会在底部显示默认的版权声明。

### 文章目录

有两个参数`enable`和`default`，他们都是必选的。

``` yml
toc:
  enable: true
  default: false
```

若`enable`为`false`则永远不会显示目录。

`enable`为`true`时：若`default: false`，则仅当`front-matter`中指明要生成目录(添加一行`toc: true`)时生成目录；若`default: true`则对每篇文章生成一个目录。

### favicon

``` yml
# favicon: /favicon.ico
```

如果您要使用站点图标，请将您的网站的favicon文件放在`source/`目录下，并更改`_config.mashiro.yml`中`favicon`项的路径。`source/`文件夹中的内容会被拷贝到`public/`目录(即生成的静态站点的根目录)下，所以您应当填入：以`source/`文件夹为根目录时，图标文件的绝对地址。

如果您不使用站点图标，请在`_config.mashiro.yml`中注释掉这一项。

### RSS订阅

``` yml
# rss: /atom.xml
```

安装插件`hexo-generator-feed`，然后根据这个插件的官方文档修改站点配置文件`_config.yml`。最后修改`_config.mashiro.yml`中的`rss`项为rss路径。

如果您不想开启这个功能，请在`_config.mashiro.yml`中注释掉这一项。

### 正文标点

> Deprecated: 这一特性已经被被关闭，取而代之的是一套设计良好的中文标点字体和标点挤压功能。请更新至最新版本使用标点挤压功能。

由于自带的中文字体标点不甚美观，我将正文中的标点都改成了英文标点与空格的组合，以使其更加美观。

要开启这一特性，请在根目录下的`_config.yml`中加入一行：

``` yml
transpunc: true
```

如果您不希望启用它，可以将`true`改成`false`，或者删除这一项。

如果您想对这一特性进行修改，请修改`themes/mashiro/scripts/transpunc.js`。

### 标点挤压

一些句子中会有诸如：「或《〈〉》这种标点组合，中间会有不太合理的间隔。这时就需要标点挤压。本主题为您实现了标点挤压功能，只需更新到最新版本的主题即可，无需任何配置。

### 数学公式

``` yml
math:
  enable: true
  engine: mathjax
```

默认情况下“渲染数学公式”只是保证里面的内容不被markdown引擎渲染，把他们包围在`$ $`或`\( \)`之间输出到html。进一步的渲染交给浏览器端脚本完成，您可以选择使用`KaTeX`或`MathJax`，只需将`engine`项设为您需要的引擎(字符串`mathjax`或`katex`)。本主题默认使用`MathJax`。主题的样式文件对行间公式设置了溢出时滚动。

`MathJax3`的长公式自动换行机制[还没有实现](http://docs.mathjax.org/en/latest/output/linebreaks.html)，这会导致行内公式过长时的溢出被截断（尤其是移动端会有这种问题）。当这种情况发生时，我的建议是把它写成行间公式以使其溢出时滚动。

本主题已将`KaTeX`的默认字体大小修改为`1em`（默认为`1.21em`，与主题风格不符合）。

### 自动标题序号

为您的文章的 2、3、4、5 级标题提供标号，正如 LaTeX 所做的那样。

``` yml
title-number: config
```

这个选项有三种取值：`all`, `config`和`none`。`all`的意思是为每篇文章都加入自动标号，`none`的意思是关闭这个功能。当取值`config`时，您需要在想要开启标号的文章的`front-matter`中设置`title-number: true`以显示标号。

### Blockquote样式

更改您的blockquote样式。有两种选择：GitHub风格的灰色引用块，和印刷风格的斜体引用块。

```
blockquote: grey
```

有两种取值：`grey`和`italic`。取为`grey`时是GitHub风格，`italic`时是印刷风格。这个配置是全站应用的，不能对各篇文章单独配置。

### 摘要

如果您的摘要是文章的前缀，您可以在Markdown文件中摘要结束的位置添加`<!-- more -->`（最好令这个语句单独成段），Hexo会自动将该标签之前的部分作为摘要在首页显示，并显示`Read More`按钮，按下后将跳转到文章页面内`<!-- more -->`后的段落处。这样生成的摘要仍然会出现在正文中。

如果您需要另行书写摘要，可以在相应文章的`front-matter`的`excerpt`字段中指定。似乎不支持`Markdown`。

### 文章中插入视频

这里以bilibili为例。通常视频网站的外链都是一个`<iframe>`标签，直接粘贴在`Markdown`文件里就可以了。但是`bilibili`的默认播放器太小了，如果想让它大小合理一些可以把它包裹在`<div class="aspect-ratio"></div>`标签内：

``` html
<div class="aspect-ratio">
    <iframe src="//player.bilibili.com/player.html?aid=41344405&bvid=BV1Zt41187Nn&cid=72612745&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>
```

本主题为这个`aspect-ratio`类写了一点样式以使其更加美观。其他问题请参考讲`bilibili`外链播放器`url`参数的文章。

## 一些麻烦事

### 404页面

这一步目前有点麻烦，好在麻烦是一次性的，而且结果比较完美。

如果使用主题的404页面，可以在博客根目录下的`source`文件夹内创建404文件夹，创建`404/index.md`文件并写入：

``` Markdown
---
title: 404
layout: "404"
sitemap: false
---

404
```

内容为您希望在正文处显示的内容。这样操作后，生成的404页面会出现在`public/404/index.html`中。下一步通常的做法是在您的服务器软件（如apache,nginx）上，设置在404错误时向用户提供这个页面。目前发现了2个问题：

1. 用户可以访问`yoursite.com/404`得到这个404页面，但状态码是`200 OK`，严谨地讲这应该是`404 Not Found`。
2. 404页面中样式文件的路径为相对路径，所以当用户访问一个形如`yoursite.com/path/not/exist`的地址时，文件`style.css`的路径会被解析为`yoursite.com/path/not/style.css`，而这个文件是不存在的。

所以目前的解决方案是：生成一次404页面后，手动将html文件中的相对路径转换为绝对路径（如，`../index.html`->`/index.html`）。将这个404页面单独保存在服务器的其他地方，并指定服务器为404访问返回该页面即可。每当您想修改404页面时，就要做一次这件事。

这还没有结束，我们还需要在每次发布时为404页面压缩字体。上面的事情做过一次之后，我们每次publish时需要做的事有：

1. `hexo g`生成站点。此时会生成`public/404/index.html`这个页面
2. `font-spider ...`压缩字体，此时会将404页面的文字和其他页面的文字共同压缩。
3. 删除`public/404`文件夹

我们可以将这些事写进一个脚本里。这样我们就解决了上面所说的两个问题。

### 关于日文/繁中支持

> 下面的内容可能已经过时。这个主题并不打算支持日文和繁体中文，烦请您自行二次开发。如果您取得了一定成果，欢迎提 issue 分享您的经验。

如果您的博客全部使用日语，可以修改`themes/mashiro/source/css/_variables.styl`，将`Chinese`换成一款日文衬线字体，如`YuMincho`或`MS Mincho`。

如果是中日混排就很麻烦。如果日文量不大，先用默认字体看看有没有问题，汉仪书宋里有平假名、片假名和一些汉字。如果有些字不在默认字体里，可能可以用思源宋体这类中日韩一起设计的字体作为正文字体，但我没试过，您有这种需求的话可以试试。`YuMincho`和`MS Mincho`基线都和汉仪书宋不一样高，区别很明显，不太可用。

繁中同理，可以先找找汉仪书宋系列有没有做繁体字，如果没有，可以挑一个您喜欢的繁体中文字体，放到`themes/mashiro/source/fonts`目录下，再在`themes/mashiro/source/css/style.styl`中将`@font-face { font-family: Chinese; }`的字体都更换成您的字体即可。如果简繁混排，可以在`style.styl`中添加新的`@font-face { font-family: Traditional-Chinese; }`并指向您的字体，并在`_variables.styl`的`font-sans`和`font-serif`变量中加入新字体，顺序视您的需要而定，哪种字体用得多就放在前面。

### TroubleShooting

See [TroubleShooting](./troubleshooting.md).

