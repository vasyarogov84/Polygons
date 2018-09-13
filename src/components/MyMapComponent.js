import React from "react";
import { compose, withProps } from "recompose";
import uuid from 'uuid';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";



const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
const polygons = { polygonsArr: [] };

const onPolygonCompleted = polygon => {
    console.log('=== polygon ===', polygon);
    let polygonBounds = polygon.getPath();
    let polygonCords = [];

    polygonBounds.forEach(function (xy, i) {
        polygonCords.push({
            'lat': xy.lat(),
            'lng': xy.lng()
        });
    });
    let polyId = uuid();
    let polygonObj = {};
    polygonObj[polyId] = polygonCords;
    polygons.polygonsArr.push(polygonObj);
    console.log(polygons);
}
const MapWithADrawingManager = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzxUAwc_1-35n6G7MI6r7lvBWymbmOvMU&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={new google.maps.LatLng(45.523064, -122.676483)}
    >
        <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
            onPolygonComplete={(poly) => onPolygonCompleted(poly)}
            defaultOptions={{
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        //google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYGON,
                        //google.maps.drawing.OverlayType.POLYLINE,
                        //google.maps.drawing.OverlayType.RECTANGLE,
                    ],
                },
                circleOptions: {
                    fillColor: `lightblue`,
                    fillOpacity: 0.2,
                    strokeWeight: 1,
                    clickable: false,
                    editable: true,
                    zIndex: 1,
                },
            }}
        />
    </GoogleMap>
    );



export default MapWithADrawingManager;

