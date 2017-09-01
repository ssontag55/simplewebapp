function startupMap(){
    me = this;

    me.responseLayer = [];
    me.weatherLayer = [];
    me.parcelLayer = [];

    me.map = L.map('viewDiv').setView([30.458,-91.1811], 15);
    me.layer = L.esri.basemapLayer('Gray').addTo(map);

    map.on('load', function () {
        mapLoaded = true;
    });
    map.zoomControl.setPosition('bottomleft');

    getLayerList();

    getIncidentConfig();

    $("#responseToggle").click(me.updateresponseLayer);
    $("#weatherToggle").click(me.updateweatherLayer);
    $("#parcelLayerToggle").click(me.updateparcelLayer);
}

function getLayerList(){

  //limitting features -- super slow service
  me.parcelLayer = L.esri.featureLayer({
    url: "./proxy?"+"http://gis.richmondgov.com/ArcGIS/rest/services/WebMercator/Parcels/MapServer/2",
    onEachFeature: function (feature, layer) {
      var popupContent = L.Util.template('<p><b>Parcel SQ Feet</b> - {LandSqFt}<br><br><b>Total Value</b> - $' + '{TotalValue}' + '<br><b>Property Class</b> - {PropertyClass} <br><b>Owner Info</b> - {OwnerName}<br><b>Address</b> - {MailAddress}<br><b>City</b> - {MailCity}<br><b>Land Use</b> - {LandUse}</p>',feature.properties);
      
      layer.bindPopup(popupContent);
    },
    style: function (feature) {
          return {color: '#bada55', weight: 2 };
      }
  });
  //me.parcelLayer.addTo(me.map);

  me.parcelLayer.on('mouseover', function (e) {
      e.layer.openPopup();
  });
  me.parcelLayer.on('mouseout', function (e) {
      e.layer.closePopup();
  }); 

  //limited by date -- only showing current time
  me.weatherLayer = L.esri.dynamicMapLayer({
    url: "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer",
    opacity: .2
  });

  me.weatherLayer.addTo(me.map);
}

function getIncidentConfig(){

  $.getJSON( "data/F01705150050.json", function( data ) {
      //me.map.flyTo([data.address.latitude,data.address.longitude],13);
      me.map.setView([data.address.latitude,data.address.longitude],15);      

      var alertIcon = L.icon({
        iconUrl: 'assets/alert.gif',
      });
      L.marker([data.address.latitude,data.address.longitude], {icon: alertIcon}).addTo(me.map).bindPopup(data.description.subtype);

      $('#incidentID').text("Incident Number: " + data.description.incident_number);
      $('#incidentDescription').text(data.description.comments);
      $('#incidentFireDept').text("Fire Dept: "+ data.fire_department.name);
      $('#incidentresponseTime').text("Reponse Time: "+ Number(data.description.extended_data.response_time)/60 + ' minutes');
      $('#incidentStart').text("Start: "+ data.description.event_opened);
      $('#incidentEnd').text("End: "+ data.description.event_closed);       

      $('#loadinggf').hide();
  });
}

function updateresponseLayer(){

  if($('#responseToggle').prop('checked') == true){
      map.addLayer(me.responseLayer);
  }
  else{
      map.removeLayer(me.responseLayer);
  }
}

function updateweatherLayer(){
  if($('#weatherToggle').prop('checked') == true){
      map.addLayer(me.weatherLayer);
  }
  else{
      map.removeLayer(me.weatherLayer);
  }  
}

function updateparcelLayer(){
  if($('#parcelLayerToggle').prop('checked') == true){
      map.addLayer(me.parcelLayer);
  }
  else{
      map.removeLayer(me.parcelLayer);
  }  
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