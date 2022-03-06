function trans_punc(content) {
    if (typeof(content) !== 'string') {
        return null;
    }
    content = content.
        replace(/，/g, ', ').
        replace(/；/g, '; ').
        replace(/：/g, ': ').
        replace(/！/g, '! ').
        replace(/“/g, ' “').
        replace(/”/g, "” ").
        replace(/（/g, ' (').
        replace(/）/g, ') ').
        // replace(/。([^\n])/g, '.&nbsp;&nbsp;$1').
        // replace(/。/g, '.').
        replace(/？/g, '? ');
    return content;
}

if (hexo.config.transpunc == true) {
    hexo.extend.filter.register('before_post_render', function(data){
        data.title = trans_punc(data.title);
        data.content = trans_punc(data.content);
    });
}