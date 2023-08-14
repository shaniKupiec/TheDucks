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
    map = createMap();

    var feature: Feature;
    // ducks
    var duckFeatures: Feature[] = [];
    for (let index = 0; index < duckList.length; index++) {
      feature = createFeature(duckList[index]);
      duckFeatures.push(feature);
    }
    const duckLayer: VectorLayer<Vector<Geometry>> = createVectorLayer(duckFeatures);
    map.addLayer(duckLayer);
    // rabbits
    var rabbitFeatures: Feature[] = [];
    for (let index = 0; index < rabbitList.length; index++) {
      feature = createFeature(rabbitList[index]);
      rabbitFeatures.push(feature);
    }
    const rabbitLayer: VectorLayer<Vector<Geometry>> = createVectorLayer(rabbitFeatures);
    map.addLayer(rabbitLayer);
    return () => {
      //map.dispose();
    };
  }, [duckList, rabbitList]);

  const createMap = (): Map => {
    var newMap: Map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: fromLonLat([2.2945, 48.8584]),
        zoom: 1,
      }),
    });
    return newMap;
  };

  const createVectorLayer = (features: Feature[]): VectorLayer<Vector<Geometry>> => {
    var layer: VectorLayer<Vector<Geometry>> = new VectorLayer({
      source: new Vector({
        features,
      })
    });
    return layer;
  };

  const createFeature = ({latitude,longitude,img_src}: {latitude: number;longitude: number;img_src: string;}): Feature => {
    var feature: Feature =  new Feature({
      geometry: new Point(fromLonLat([latitude, longitude]))
    });

    var style: Style = new Style({
      image: new Icon({
        src: img_src,
        scale: 0.25,
      }),
      zIndex: 100,
    })
    feature.setStyle(style);
    return feature;
  }

  return (
    <>
      <StyledMap id="map" style={{ width: "100%", height: "400px" }} />;
    </>
  );
}

export default MapComponent;
