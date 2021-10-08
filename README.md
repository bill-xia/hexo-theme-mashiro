# hexo-theme-mashiro

这是一个模仿CTeX默认样式的、简洁、学术风格的主题。

## Usage

### Install

``` sh
cd themes
git clone git@github.com:bill-xia/hexo-theme-mashiro.git
mv hexo-theme-mashiro mashiro # 或者直接重命名文件夹为mashiro
npm uninstall hexo-renderer-markdown-it
npm install hexo-renderer-markdown-them
npm install font-spider -g
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

主题支持中文字体压缩，$\LaTeX$数学公式渲染，以及hexo默认主题支持的其他功能（除了sidebar之外，目前我没能把它和我的主题融合起来）。暂时不支持文章目录功能。

代码高亮：采用Hexo的默认高亮引擎，带有行号，通过主题内的css和浏览器端js实现滚动时行号锁定。

这个主题采用了CTeX默认使用的字体，英文为Latin Modern系列，中文正文为汉仪书宋，粗体为方正黑体，斜体为楷体，代码区使用仿宋体。顺便一提，我使用的其实不是汉仪书宋，而是CTeX制作组制作的FandolSong（其他字体同），最大的区别在于标点符号，这个字体对中英文标点进行了某种形式的统一。如果您想更换别的字体，我有一个备选方案：把中文标点换成英文，并添加空格。启用这个功能需要修改`themes/mashiro/scripts/transpunc.js`，将18行处的`if (false)`改成`if (true)`即可。

Markdown引擎：通过我为`markdown-it`内嵌一些插件得到的`markdown-them`引擎渲染，支持渲染数学公式、Todo-list等。默认情况下“渲染数学公式”只是保证里面的内容不被markdown引擎渲染，把他们包围在`$ $`或`\( \)`之间输出到html。进一步的渲染交给浏览器端脚本完成，您可以选择使用`KaTeX`或`MathJax`。本主题默认使用`MathJax`，因为`KaTeX`默认渲染出来又大又粗，和我们的衬线字体不搭配，`MathJax`则正好。

## 关于日文/繁中支持

如果您的博客全部使用日语，可以修改`themes/mashiro/source/css/_variables.styl`，将`Chinese`换成一款日文衬线字体，如`YuMincho`或`MS Mincho`。

如果是中日混排就很麻烦。如果日文量不大，先用默认字体看看有没有问题，汉仪书宋里有平假名、片假名和一些汉字。如果有些字不在默认字体里，可能可以用思源宋体这类中日韩一起设计的字体作为正文字体，但我没试过，您有这种需求的话可以试试。`YuMincho`和`MS Mincho`基线都和汉仪书宋不一样高，区别很明显，不太可用。

繁中同理，可以先找找汉仪书宋系列有没有做繁体字，如果没有，可以挑一个您喜欢的繁体中文字体，放到`themes/mashiro/source/fonts`目录下，再在`themes/mashiro/source/css/style.styl`中将`@font-face { font-family: Chinese; }`的字体都更换成您的字体即可。如果简繁混排，可以在`style.styl`中添加新的`@font-face { font-family: Traditional-Chinese; }`并指向您的字体，并在`_variables.styl`的`font-sans`和`font-serif`变量中加入新字体，顺序视您的需要而定，哪种字体用得多就放在前面。
