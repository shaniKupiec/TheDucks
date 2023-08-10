import { useEffect, useState } from "react";
import { Map, View, Feature } from "ol";
import { OSM, Vector } from "ol/source";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Geometry, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import IDuck from "../interfaces/DuckInterface";
import IRabbit from "../interfaces/RabbitInterface";
import { selectDucks } from "../store/slices/duckSlice";
import { selectRabbits } from "../store/slices/rabbitSlice";
import { useAppSelector } from "../store/hooks";
import { StyledMap } from "../styling/components/Map";

function MapComponent() {
  var map: Map;
  const duckList: IDuck[] = useAppSelector(selectDucks);
  const rabbitList: IRabbit[] = useAppSelector(selectRabbits);

  useEffect(() => {
    if (!duckList.length || !rabbitList.length || map) return;

    var feature =  new Feature({
      geometry: new Point(fromLonLat([duckList[0].latitude, duckList[0].longitude]))
    });

    var style = new Style({
      image: new Icon({
        src: duckList[0].img_src,
        scale: 0.25,
      }),
      zIndex: 100,
    })
    feature.setStyle(style);

    var layer: VectorLayer<Vector<Point>> = new VectorLayer({
      source: new Vector({
        features: [
          feature
        ],
      }),
    });
      // style: new Style({
      //   image: new Icon({
      //     src: duckList[0].img_src,
      //     scale: 0.25,
      //   }),
      //   zIndex: 100,
      // }),

      // style: function (feature) {
      //   const size = feature.get('features').length;
      //   let style;
      //   style = new Style({
      //     image: new Icon({
      //       src: duckList[0].img_src,
      //            scale: 0.25,
      //          }),
      //     zIndex: 100,
      //   });
      //   return style;
      // },
    //layer.setFeatures([feature]);
    console.log("layer",layer);

    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        //layer
      ],
      target: "map",
      view: new View({
        center:fromLonLat([2.2945, 48.8584]),
        zoom: 1,
      }),
    });

    map.addLayer(layer);
  }, [duckList, rabbitList]);



  return (
    <>
      <StyledMap id="map" style={{ width: "100%", height: "400px" }} />;
    </>
  );
}

export default MapComponent;
