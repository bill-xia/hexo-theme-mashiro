# hexo-theme-mashiro

这是一个模仿CTeX默认样式的、简洁、学术风格的主题。[预览：我的博客](https://wilsonxia.cn)

## Usage

提及修改配置文件`_config.yml`时，总是指您的博客根目录下的配置文件，而非主题文件夹下的。

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

Markdown引擎：通过我为`markdown-it`内嵌一些插件得到的[`markdown-them`引擎](https://github.com/bill-xia/markdown-them)渲染，支持渲染数学公式、Todo-list等。默认情况下“渲染数学公式”只是保证里面的内容不被markdown引擎渲染，把他们包围在`$ $`或`\( \)`之间输出到html。进一步的渲染交给浏览器端脚本完成，您可以选择使用`KaTeX`或`MathJax`。本主题默认使用`MathJax`。主题的样式文件对行间公式设置了溢出时滚动。

数学公式渲染的一点问题：`MathJax3`的长公式自动换行机制[还没有实现](http://docs.mathjax.org/en/latest/output/linebreaks.html)，这会导致行内公式过长时的溢出被截断（尤其是移动端会有这种问题）。当这种情况发生时，我的建议是把它写成行间公式以使其溢出时滚动。如果您实在有这方面的需求，可以尝试使用`KaTeX`渲染，它带有自动换行功能。但是由于简单地引入`KaTeX`要引入`css`，会导致`font-spider`不工作，一个可行的方案是[将`KaTeX`源文件部署在您的服务器上](https://katex.org/docs/browser.html#download--host-things-yourself)。另外，本主题已将`KaTeX`的默认字体大小修改为`1em`（默认为`1.21em`，与主题风格不符合），即使您没有使用`KaTeX`。

这个主题的底部有我的网站的备案号，写在`layout/_partial/footer.ejs`里。您不需要备案号就删除，需要的话更改为您的备案号即可。

## 关于日文/繁中支持

如果您的博客全部使用日语，可以修改`themes/mashiro/source/css/_variables.styl`，将`Chinese`换成一款日文衬线字体，如`YuMincho`或`MS Mincho`。

如果是中日混排就很麻烦。如果日文量不大，先用默认字体看看有没有问题，汉仪书宋里有平假名、片假名和一些汉字。如果有些字不在默认字体里，可能可以用思源宋体这类中日韩一起设计的字体作为正文字体，但我没试过，您有这种需求的话可以试试。`YuMincho`和`MS Mincho`基线都和汉仪书宋不一样高，区别很明显，不太可用。

繁中同理，可以先找找汉仪书宋系列有没有做繁体字，如果没有，可以挑一个您喜欢的繁体中文字体，放到`themes/mashiro/source/fonts`目录下，再在`themes/mashiro/source/css/style.styl`中将`@font-face { font-family: Chinese; }`的字体都更换成您的字体即可。如果简繁混排，可以在`style.styl`中添加新的`@font-face { font-family: Traditional-Chinese; }`并指向您的字体，并在`_variables.styl`的`font-sans`和`font-serif`变量中加入新字体，顺序视您的需要而定，哪种字体用得多就放在前面。

## Todo List

- [ ] 楷体和仿宋体字体文件加入
- [ ] 寻找兼容汉仪书宋的繁体中文、日文与韩文正文字体
- [ ] 如果上条做不到，寻找CJK语系全兼容的同时不太破坏CTeX风格的字体
- [ ] 代码块一键复制
- [ ] font-spider脚本简化
- [ ] 主题内置KaTeX源文件
- [ ] 主题内配置数学渲染引擎