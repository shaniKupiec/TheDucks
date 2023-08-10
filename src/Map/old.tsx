import React, { useEffect, useState } from "react";
import { Map, View, Feature } from "ol";
import { OSM, Vector } from "ol/source";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Point } from "ol/geom";
import IDuck from "../interfaces/DuckInterface";
import { useAppSelector } from "../store/hooks";
import { selectDucks } from "../store/slices/duckSlice";
import { fromLonLat } from "ol/proj";

function MapComponent() {
  //const [map, setMap] = useState<Map | undefined>(undefined);
  const duckList: IDuck[] = useAppSelector(selectDucks);

  useEffect(() => {
    //createMap();
    if(!duckList.length) return;
    var layer: VectorLayer<Vector<Point>> = new VectorLayer({
      source: new Vector({
        features: [
        new Feature({
          geometry: new Point(fromLonLat([duckList[0].latitude, duckList[0].longitude])),
        }),
      ],
    }),
    style: new Style({
      image: new Icon({
        src: duckList[0].img_src,
        scale: 0.25,
      }),
      zIndex: 100,
    }),
    });

    const map: Map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        layer
      ],
      target: "map",
      view: new View({
        center:fromLonLat([2.2945, 48.8584]),
        zoom: 1,
      }),
    });

    for (let index = 0; index < duckList.length; index++) {
      //createVectorLayer(index);
      //console.log("duckList[index]", duckList[index]);

      
      //const newMap: Map = JSON.parse(JSON.stringify(map));
      //map.addLayer(layer);
      //setMap(newMap);

    }

    console.log("map",map);
    return () => {
      //map.dispose();
    };
  });

//   const createMap = () => {
//     const mapToSave: Map = new Map({
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//       ],
//       target: "map",
//       view: new View({
//         center:fromLonLat([2.2945, 48.8584]),
//         zoom: 1,
//       }),
//     });

//     //setMap(mapToSave);
// }

// const createVectorLayer = (index: number) => {
//   var layer: VectorLayer<Vector<Point>> = new VectorLayer({
//     source: new Vector({
//       features: [
//       new Feature({
//         geometry: new Point(fromLonLat([duckList[index].latitude, duckList[index].longitude])),
//       }),
//     ],
//   }),
//   style: new Style({
//     image: new Icon({
//       src: duckList[index].img_src,
//       scale: 0.25,
//     }),
//     zIndex: 100,
//   }),
//   });
//   //const newMap: Map = JSON.parse(JSON.stringify(map));
//   //newMap.addLayer(layer);
//   //setMap(newMap);
// }

const addFeatureToLayer = () => {

}

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }} />;
    </>
  );
};

export default MapComponent;
