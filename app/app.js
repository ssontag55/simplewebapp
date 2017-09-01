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

    getIncidentConfig();
}

function getLayerList(){


  //limitting features -- super slow service
  var parcels = L.esri.featureLayer({
    url: "http://gis.richmondgov.com/ArcGIS/rest/services/WebMercator/Parcels/MapServer/2",
    onEachFeature: function (feature, layer) {
      var popupContent = L.Util.template('<p><b>Parcel SQ Feet</b> - {LandSqFt}<br><br><b>Total Value</b> - $' + '{TotalValue}' + '<br><b>Property Class</b> - {PropertyClass} <br><b>Owner Info</b> - {OwnerName}<br><b>Address</b> - {MailAddress}<br><b>City</b> - {MailCity}<br><b>Land Use</b> - {LandUse}</p>',feature.properties);
      
      layer.bindPopup(popupContent);
    },
    style: function (feature) {
          return {color: '#bada55', weight: 2 };
      }
  });
  parcels.addTo(me.map);

  parcels.on('mouseover', function (e) {
      e.layer.openPopup();
  });
  parcels.on('mouseout', function (e) {
      e.layer.closePopup();
  });
  
}

function getIncidentConfig(){

  $.getJSON( "data/F01705150050.json", function( data ) {
      //me.map.flyTo([data.address.latitude,data.address.longitude],13);
      me.map.setView([data.address.latitude,data.address.longitude],13);      
  });

  $('#loadinggf').hide();
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