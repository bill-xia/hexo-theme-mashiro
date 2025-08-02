let specs = document.getElementsByClassName('language-vega-lite')
let num = specs.length;
const opts = {
  "mode": "vega-lite",
  "renderer": "svg",
  "actions": {export: true, source: false, editor: true, compiled: false}
};
for (var i = 0; i < num; i++) {
    let el = "#vis-" + i;
    let jsonSpec = window.YAML.parse(specs[i].textContent)
    console.log(jsonSpec)
    //console.log(vl.compile(jsonVis).spec == undefined)
    htmlString = "<div class='vega-embed' id='vis-" + i + "'></div>"
    specs[i].parentNode.insertAdjacentHTML('beforebegin', htmlString);
    specs[i].parentNode.style.display = 'none';
    vegaEmbed(el, jsonSpec, opts);
};