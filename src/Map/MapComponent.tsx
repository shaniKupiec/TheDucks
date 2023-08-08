import React, { useEffect } from "react";
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

const MapComponent: React.FC = () => {

  const duckList: IDuck[] = useAppSelector(selectDucks);

  useEffect(() => {
    const map: Map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center:fromLonLat([2.2945, 48.8584]),
        zoom: 1,
      }),
    });

    for (let index = 0; index < duckList.length; index++) {
      var layer: VectorLayer<Vector<Point>> = new VectorLayer({
        source: new Vector({
          features: [
          new Feature({
            geometry: new Point(fromLonLat([duckList[index].latitude, duckList[index].longitude])),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: duckList[index].img_src,
          scale: 0.25,
        }),
        zIndex: 100,
      }),
      });
      map.addLayer(layer);
      //console.log("duckList[index]", duckList[index]);
    }

    console.log("map",map);
    return () => {
      map.dispose();
    };
  });

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }} />;
    </>
  );
};

export default MapComponent;
