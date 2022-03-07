function trans_punc(content) {
    if (typeof(content) !== 'string') {
        return null;
    }
    content = content.
        replace(/([，；！：、？：）》」』】（《「『【。〈〉“”]+)/g, '<span class="bd-box">$1</span>').
        replace(/(，|；|！|：|、|？|：|）|》|」|』|。|〉|】|”)/g, '<h-char class="bd bd-beg"><h-inner>$1</h-inner></h-char>').
        replace(/(（|《|「|『|【|〈|“)/g, '<h-char class="bd bd-end"><h-inner>$1</h-inner></h-char>')
        ;
    return content;
}

hexo.extend.filter.register('before_post_render', function(data){
    data.content = trans_punc(data.content);
});