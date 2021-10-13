# hexo-theme-mashiro

这是一个模仿CTeX默认样式的、简洁、学术风格的主题。

## Usage

提及修改配置文件`_config.yml`时，总是指您的

### Install

``` sh
cd themes
git clone git@github.com:bill-xia/hexo-theme-mashiro.git
mv hexo-theme-mashiro mashiro # 或者直接重命名文件夹为mashiro
npm uninstall hexo-renderer-marked # 卸载您当前的markdown引擎
npm install hexo-renderer-markdown-them
npm install font-spider -g # 全局安装font-spider，用于字体压缩
```

修改`_config.yml`使用`Mashiro`主题即可。

为了压缩中文字体，需要修改`_config.yml`的`relative_link`为`true`，因为`font-spider`是根据相对地址来查找字体文件的。

### Deploy

``` sh
hexo clean
hexo g
font-spider public/*.html public/*/*.html public/*/*/*.html public/*/*/*/*.html
hexo deploy
```

注意`font-spider`那一行，您的public文件夹中最深的html文件嵌套了几层，就应当在后面写几层的通配符（俺只会笨办法...）。

## 特性

注意：这个主题每次更新后都要求此后访问的用户等待共计800K左右的字体加载，对于一个低带宽的低配服务器而言，这需要一段时间（约1s-5s），这段时间内用户看到的内容各不相同，可能空白，可能是默认无衬线字体字体，也可能是默认衬线字体。如果您不能接受这一点，可能这个主题不适合您。

主题支持中文字体压缩，LaTeX数学公式渲染，以及hexo默认主题支持的其他功能（除了sidebar之外，目前我没能把它和我的主题融合起来）。暂时不支持文章目录功能。

代码高亮：采用Hexo的默认高亮引擎，带有行号，通过主题内的css和浏览器端js实现滚动时行号锁定。

这个主题采用了CTeX默认使用的字体，英文为Latin Modern系列，中文正文为汉仪书宋，粗体为方正黑体。（斜体应为楷体，代码区应为仿宋体，我还没有做。）CTeX制作的Fandols系列字体可以显示但无法压缩，我目前无法解决，所以没有用这个系列。

Markdown引擎：通过我为`markdown-it`内嵌一些插件得到的[`markdown-them`引擎](https://github.com/bill-xia/markdown-them)渲染，支持渲染数学公式、Todo-list等。默认情况下“渲染数学公式”只是保证里面的内容不被markdown引擎渲染，把他们包围在`$ $`或`\( \)`之间输出到html。进一步的渲染交给浏览器端脚本完成，您可以选择使用`KaTeX`或`MathJax`。本主题默认使用`KaTeX`。主题的样式文件对行间公式设置了溢出时滚动，将字体大小修改为`1em`（`KaTeX`默认为`1.21em`，与主题风格不符合）。`MathJax3`的长公式自动换行机制[还没有实现](http://docs.mathjax.org/en/latest/output/linebreaks.html)，所以暂时采用`KaTeX`渲染，没有发现太大问题。想使用`MathJax`也是完全可行的，只要在`layout/_partial/after-footer.ejs`中注释掉`KaTeX`相关脚本，取消注释`MathJax`相关脚本即可使用`MathJax3`。使用`MathJax2`需要您在此处自己引入脚本，不过难度不大。我的样式文件同样为`MathJax`设置了溢出时滚动。

## 关于日文/繁中支持

如果您的博客全部使用日语，可以修改`themes/mashiro/source/css/_variables.styl`，将`Chinese`换成一款日文衬线字体，如`YuMincho`或`MS Mincho`。

如果是中日混排就很麻烦。如果日文量不大，先用默认字体看看有没有问题，汉仪书宋里有平假名、片假名和一些汉字。如果有些字不在默认字体里，可能可以用思源宋体这类中日韩一起设计的字体作为正文字体，但我没试过，您有这种需求的话可以试试。`YuMincho`和`MS Mincho`基线都和汉仪书宋不一样高，区别很明显，不太可用。

繁中同理，可以先找找汉仪书宋系列有没有做繁体字，如果没有，可以挑一个您喜欢的繁体中文字体，放到`themes/mashiro/source/fonts`目录下，再在`themes/mashiro/source/css/style.styl`中将`@font-face { font-family: Chinese; }`的字体都更换成您的字体即可。如果简繁混排，可以在`style.styl`中添加新的`@font-face { font-family: Traditional-Chinese; }`并指向您的字体，并在`_variables.styl`的`font-sans`和`font-serif`变量中加入新字体，顺序视您的需要而定，哪种字体用得多就放在前面。
