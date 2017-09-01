function startupMap(){
    me = this;

    this.datalist = [];
    me.resultLyr = [];
    me.resultInterpolateLyr = [];
    me.resultHeatmapLyr = [];

    me.map = L.map('viewDiv').setView([30.458,-91.1811], 15);
    me.layer = L.esri.basemapLayer('Gray').addTo(map);

    map.on('load', function () {
        mapLoaded = true;
    });
    map.zoomControl.setPosition('bottomleft');

    getLayerList();

}

function getLayerList(){

  
}

/* Set Basemap */
function setBasemap(basemap) {
  if (me.layer) {
    me.map.removeLayer(me.layer);
  }

  me.layer = L.esri.basemapLayer(basemap);

  me.map.addLayer(me.layer);
}

function changeBasemap(basemaps){
  var basemap = basemaps.value;
  setBasemap(basemap);
}