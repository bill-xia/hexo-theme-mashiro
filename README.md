# hexo-theme-mashiro

这是一个模仿CTeX默认样式的、简洁、学术风格的主题。[预览：我的博客](https://wilsonxia.cn)

## 使用

### 安装

``` sh
cd themes
git clone git@github.com:bill-xia/hexo-theme-mashiro.git
mv hexo-theme-mashiro mashiro # 或者直接重命名文件夹为mashiro
npm uninstall hexo-renderer-marked # 卸载您当前的markdown引擎
npm install hexo-renderer-markdown-them
npm install font-spider -g # 全局安装font-spider，用于字体压缩
```

现在您的主题文件夹`themes`中已经有了一个名为`mashiro`的文件夹。Hexo有两个配置文件：站点配置文件，即站点根目录下的`_config.yml`，以及主题配置文件，即各个主题根目录下的`_config.yml`。为了方便您更新主题，强烈建议您总是将主题配置文件放在主题文件夹外（最好在根目录下）。配置方法为：

1. 在站点根目录中的`_config.yml`文件中添加一行：`theme_config: _config.mashiro.yml`
2. 在站点根目录中新建文件`_config.mashiro.yml`，并将`themes/mashiro/_config.yml`中的内容粘贴进去。

理想情况是，在完成上述操作后，您不再需要接触`themes/mashiro`目录中的任何文件。这样，在您更新主题时，您原来的主题配置不会丢失。

### 更新

更新主题时，直接删除（或备份）`themes/mashiro`文件夹，再重复安装步骤即可。如果您安装时按照文档将主题配置文件移到了站点根目录下，那么您的配置不会丢失。更新时本项目将尽量兼容旧的配置文件，如果旧的配置文件失效了，还要麻烦您重新配置一次。

### 配置

修改`_config.yml`中`theme`项为`mashiro`即可开始使用本主题！

为了压缩中文字体，需要修改`_config.yml`的`relative_link`为`true`，因为`font-spider`是根据相对地址来查找字体文件的。

### 部署站点

``` sh
hexo clean
hexo g
font-spider public/*.html public/*/*.html public/*/*/*.html public/*/*/*/*.html
hexo deploy
```

注意`font-spider`那一行，您的public文件夹中最深的html文件嵌套了几层，就应当在后面写几层的通配符（俺只会笨办法...）。您可以将上面这些语句保存为一个脚本文件，部署时运行一下就行了。

## 特性

### Warning

注意：这个主题每次更新后都要求此后访问的用户等待共计800K左右的字体加载，对于一个低带宽的低配服务器而言，这需要一段时间（约1s-5s），这段时间内用户看到的内容各不相同，可能空白，可能是默认无衬线字体字体，也可能是默认衬线字体。如果您不能接受这一点，可能这个主题不适合您。

### 概述

主题支持中文字体压缩，LaTeX数学公式渲染，以及hexo默认主题支持的其他功能（除了sidebar之外，目前我没能把它和我的主题融合起来）。暂时不支持文章目录功能。主题采用了CTeX默认使用的字体，英文为Latin Modern系列，中文正文为汉仪书宋，粗体为方正黑体。（斜体应为楷体，代码区应为仿宋体，我还没有做。）CTeX制作的Fandols系列字体可以显示但无法压缩，我目前无法解决，所以没有用这个系列。

### Markdown渲染

代码高亮：采用Hexo的默认高亮引擎，带有行号，通过主题内的css和浏览器端js实现滚动时行号锁定。

Markdown引擎：通过我为`markdown-it`内嵌一些插件得到的[`markdown-them`引擎](https://github.com/bill-xia/markdown-them)渲染，支持渲染数学公式、Todo-list等。

### 文章目录

可在`themes/mashiro/_config.yml`中配置，有两个参数`enable`和`default`：

``` yml
toc:
    enable: true
    default: false
```

若`enable`为`false`则永远不会显示目录。`enable`为`true`时，若`default: false`，则只为`front-matter`中指明要生成目录(添加一行`toc: true`)时生成，否则对每篇文章生成一个目录。

### 边栏

``` yml
sidebar: bottom
widgets:
- recent_posts
- category
- tagcloud
```

详见[landscape主题配置](https://github.com/hexojs/hexo-theme-landscape#sidebar)。

### 数学公式

默认情况下“渲染数学公式”只是保证里面的内容不被markdown引擎渲染，把他们包围在`$ $`或`\( \)`之间输出到html。进一步的渲染交给浏览器端脚本完成，您可以选择使用`KaTeX`或`MathJax`，只需将配置文件中的`math, engine`项设为您需要的引擎。本主题默认使用`MathJax`。主题的样式文件对行间公式设置了溢出时滚动。

`MathJax3`的长公式自动换行机制[还没有实现](http://docs.mathjax.org/en/latest/output/linebreaks.html)，这会导致行内公式过长时的溢出被截断（尤其是移动端会有这种问题）。当这种情况发生时，我的建议是把它写成行间公式以使其溢出时滚动。

`KaTeX`带有自动换行功能。由于引入`KaTeX`要引入`css`，会导致`font-spider`不工作，需要在`font-spider`命令中加入选项`--ignore katex.min.css`。另外，本主题已将`KaTeX`的默认字体大小修改为`1em`（默认为`1.21em`，与主题风格不符合），无论您选择的渲染引擎是`KaTeX`还是`MathJax`。

### 网站底部信息

这个主题的底部有我的网站的备案号，写在`themes/mashiro/layout/_partial/footer.ejs`里。如果您不需要备案号就删除，需要的话更改为您的备案号即可。

### 摘要

如果您的摘要是文章的前缀，您可以在Markdown文件中摘要结束的位置添加`<!-- more -->`（最好令这个语句单独成段），Hexo会自动将该标签之前的部分作为摘要在首页显示，并显示`Read More`按钮，按下后将跳转到文章页面内`<!-- more -->`后的段落处。这样生成的摘要仍然会出现在正文中。

如果您需要另行书写摘要，可以在`front-matter`的`excerpt`字段处指定。似乎不支持`Markdown`。

### 正文标点

我将正文中的标点都改成了英文标点与空格，以使其更加美观。

要开启这一特性，请在根目录下的`_config.yml`中加入一行：

``` yml
transpunc: true
```

如果您不希望启用它，可以将`true`改成`false`，或者删除这一项。

如果您想对这一特性进行修改，请修改`themes/mashiro/scripts/transpunc.js`。

### 404页面

这一步目前是很麻烦的，我正在修改主题让它变得简单。

如果使用主题的404页面，可以在博客根目录下的`source`文件夹内创建404文件夹，创建`404/index.md`文件并写入：

``` Markdown
---
title: 404
layout: "404"
---

404
```

内容为您希望在正文处显示的内容。这样操作后，生成的404页面会出现在`public/404/index.html`中。下一步通常的做法是在您的服务器软件（如apache,nginx）上，设置在404错误时向用户提供这个页面。目前发现了2个问题：

1. 用户可以访问`yoursite.com/404`得到这个404页面，但状态码是`200 OK`，而且这可能会导致sitemap,rss等插件认为这是一个有内容的页面并为它创建链接。
2. 404页面中样式文件的路径为相对路径，所以当用户访问一个形如`yoursite.com/path/not/exist`的地址时，文件`style.css`的路径会被解析为`yoursite.com/path/not/style.css`，而这个文件是不存在的。

所以目前的解决方案是：生成一次404页面后，保存在其他路径中，并手动将html文件中的相对路径转换为绝对路径（如，`../index.html`->`/index.html`）。然后删除404文件夹（或者将文件夹重命名为`_404`），重新生成站点。将404页面单独保存在服务器的其他地方，并指定服务器为404访问返回该页面即可。

这太麻烦了，我在尝试让它变得简单一些。

### favicon

将您的网站的favicon文件放在`themes/mashiro/source/`目录下，并更改`_config.mashiro.yml`中`favicon`项的路径。`themes/mashiro/source/`文件夹中的内容会被拷贝到`public/`的目录下，所以您应当填入：以`source`文件夹为根目录时，图标文件的绝对地址。

### RSS订阅

安装插件`hexo-generator-feed`，然后根据这个插件的官方文档修改`_config.yml`。最后修改`_config.mashiro.yml`第54行为您的rss路径。如果您不想开启这个功能，请注释掉`_config.mashiro.yml`第54行。

### 文章中插入视频

这里以bilibili为例。通常视频网站的外链都是一个`<iframe>`标签，直接粘贴在`Markdown`文件里就可以了。但是`bilibili`的默认播放器太小了，如果想让它大小合理一些可以把它包裹在`<div class="aspect-ratio"></div>`标签内：

``` html
<div class="aspect-ratio">
    <iframe src="//player.bilibili.com/player.html?aid=41344405&bvid=BV1Zt41187Nn&cid=72612745&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>
```

本主题为这个`aspect-ratio`类写了一点样式以使其更加美观。其他问题请参考讲`bilibili`外链播放器`url`参数的文章。

## 关于日文/繁中支持

如果您的博客全部使用日语，可以修改`themes/mashiro/source/css/_variables.styl`，将`Chinese`换成一款日文衬线字体，如`YuMincho`或`MS Mincho`。

如果是中日混排就很麻烦。如果日文量不大，先用默认字体看看有没有问题，汉仪书宋里有平假名、片假名和一些汉字。如果有些字不在默认字体里，可能可以用思源宋体这类中日韩一起设计的字体作为正文字体，但我没试过，您有这种需求的话可以试试。`YuMincho`和`MS Mincho`基线都和汉仪书宋不一样高，区别很明显，不太可用。

繁中同理，可以先找找汉仪书宋系列有没有做繁体字，如果没有，可以挑一个您喜欢的繁体中文字体，放到`themes/mashiro/source/fonts`目录下，再在`themes/mashiro/source/css/style.styl`中将`@font-face { font-family: Chinese; }`的字体都更换成您的字体即可。如果简繁混排，可以在`style.styl`中添加新的`@font-face { font-family: Traditional-Chinese; }`并指向您的字体，并在`_variables.styl`的`font-sans`和`font-serif`变量中加入新字体，顺序视您的需要而定，哪种字体用得多就放在前面。

## Todo List

- [ ] 楷体和仿宋体字体文件加入
- [ ] 寻找兼容汉仪书宋的繁体中文、日文与韩文正文字体
- [ ] 如果上条做不到，寻找CJK语系全兼容的同时不太破坏CTeX风格的字体
- [x] 代码块一键复制
- [ ] font-spider脚本简化
- [x] 主题内置KaTeX源文件
- [x] 主题内配置数学渲染引擎
- [ ] 404页面快速生成
- [x] 需要修改源代码的内容都写入配置
- [x] 边栏标题左边的padding