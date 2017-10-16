var map;

window.onload = function() {
    map = L.map("mapid", {
        center: new L.LatLng(55.615814, 37.717085),
        fadeAnimation: !1,
        zoomAnimation: !1,
        zoom: 6,
        zoomControl: !1
    });
    
    map = L.map('mapId').setView([51.505, -0.09], 13);
    
    L.tileLayer("http://tile.digimap.ru/rumap/{z}/{x}/{y}.png?guid=131EEFFD-1342-4C0D-B03C-FD0EB571DC48", {
        maxZoom: 20,
        minZoom: 6,
        attribution: "Geocenter CODD"
    }).addTo(map);
    getWTF();
    madeDet()
}
var markers = Array(2)
  , myIcon = L.divIcon({
    html: '<svg class="iconDet" width="34" height="49"><g stroke="rgba(0,0,187,0.6)" stroke-width="2"><path d="M2,17 a15,15 0 1,1 30,0 c-1,15 -3,15 -15,30 c5,-15 8,-15 5,-20 c-3,-2 -7,-2 -10,0 c-3,5 0,5 5,20 c-12,-15 -14,-15 -15,-30 z" fill="#3f8eff"></path><circle cx="17" cy="15" r="6" fill="white"></circle></g></svg>',
    className: "my-div-icon",
    iconSize: new L.Point(32,47),
    iconAnchor: new L.Point(16,47),
    popupAnchor: new L.Point(0,-50)
});
function setIconF(q, h) {
    var n = q.getChildCount();
    return new L.DivIcon({
        html: "<div></div><div></div><span>" + n + "</span>",
        className: "detcl l",
        iconSize: new L.Point(34,34)
    })
}
function setIconS(q, h) {
    var n = q.getChildCount();
    return new L.DivIcon({
        html: "<div></div><div></div><span>" + n + "</span>",
        className: "detcl m",
        iconSize: new L.Point(34,34)
    })
}

function getWTF() {
    try{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                madeDet(JSON.parse(this.responseText));
            }
        };

        xmlhttp.open("GET", "getWTF.php" , true);
        xmlhttp.send();
    } catch (x){
        console.error('run on server')
    }
}

function madeDet(inputParam) {
    const listForMap = inputParam || wtf;

    for (let h = 0; h < markers.length; h++)
        markers[h] = new L.MarkerClusterGroup({
            showCoverageOnHover: !1,
            maxClusterRadius: 120,
            iconCreateFunction: 0 == h ? b => setIconF(b, h) : b => setIconS(b, h)
        });

    for (let h = 0, n = listForMap.length; h < n; h++) {
        var e = '<div class="ids bindpop_create_by_uoiasfy"  href="" onclick="return false;" title="\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e" ><span>' + listForMap[h].Name + "</span><br /><span>--------------</span><br /><span>" + listForMap[h].description + "</span></div>";
        markers[0].addLayer((new L.Marker(new L.LatLng(listForMap[h].Y,listForMap[h].X),{
            title: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c",
            icon: myIcon
        })).bindPopup(e))
    }
    map.addLayer(markers[0])
}
;
