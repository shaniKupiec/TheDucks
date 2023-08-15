import { useEffect, useRef, useState } from "react";
import { Map, View, Feature } from "ol";
import { OSM, Vector } from "ol/source";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Geometry, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import IDuck from "../../interfaces/DuckInterface";
import IRabbit from "../../interfaces/RabbitInterface";
import { selectDucks } from "../../store/slices/duckSlice";
import { selectRabbits } from "../../store/slices/rabbitSlice";
import { useAppSelector } from "../../store/hooks";
import { StyledMap } from "../../styling/components/Map";
import BaseLayer from "ol/layer/Base";

function MapComponent() {
  const duckList: IDuck[] = useAppSelector(selectDucks);
  const rabbitList: IRabbit[] = useAppSelector(selectRabbits);

  const createVectorLayer = (features: Feature[]): VectorLayer<Vector<Geometry>> => {
    let layer: VectorLayer<Vector<Geometry>> = new VectorLayer({
      source: new Vector({
        features,
      })
    });
    return layer;
  };

  // var map: Map | undefined;
  const mapRef = useRef<Map|undefined>()
  const duckFeatures: Feature[] = [];
  const rabbitFeatures: Feature[] = [];
  const duckLayer: VectorLayer<Vector<Geometry>> = createVectorLayer([]);
  var rabbitLayer: VectorLayer<Vector<Geometry>> = createVectorLayer([]);

  useEffect(() => {
    if (!mapRef.current) initMap();
    
    return () => {
      //mapRef.current.dispose();
    };
  }, []);
  
  useEffect(() => {
    console.log("map!!!!!",mapRef.current);
    if (!mapRef.current) return;
    console.log("2 duckList length updated: ", duckList.length);
    updateDucks();

    return () => {
      //mapRef.current.dispose();
    };
  }, [duckList.length, mapRef.current]);

  const updateDucks = (): void => {

    var idx: number, id: number | string | undefined;
    var arr: number[] = [];
    //console.log("updateDucks function");
    //console.log("duckFeatures.length",duckFeatures.length);
    //console.log("duckList.length",duckList.length);

    for (let i = 0; i < duckFeatures.length; i++) {
      id = duckFeatures[i].getId();
      idx = duckList.findIndex(duck => duck.id == id);
      if(idx < 0){
        // remove
        console.log("remove");
        
        duckLayer?.getSource()?.removeFeature(duckFeatures[i]);
      } else arr[idx] = 1;
    }
    
    for (let i = 0; i < duckList.length; i++) {
      if(!arr[i]){
        //console.log("add");
        duckFeatures.push(createFeature(duckList[i]));
        duckLayer.getSource()?.addFeature(createFeature(duckList[i]));
        duckLayer.getSource()?.changed();
        //console.log(duckLayer.getSource()?.getFeatures())
        // const layers[] :BaseLayer = mapRef.current?.getLayers();
        // mapRef.current?.setLayers(layers);
      }
    }
  }

  const initMap = (): void => {
    mapRef.current = createMap();
    mapRef.current.addLayer(duckLayer);
    mapRef.current.addLayer(rabbitLayer);
    //console.log("!!!!!!!!!!!!!!!!!",duckLayer.getSource())
  }

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

  const createFeature = ({latitude,longitude,img_src, id}: {latitude: number;longitude: number;img_src: string;id: number}): Feature => {
    let feature: Feature =  new Feature({
      geometry: new Point(fromLonLat([latitude, longitude]))
    });

    let style: Style = new Style({
      image: new Icon({
        src: img_src,
        scale: 0.25,
      }),
      zIndex: 100,
    })

    feature.setStyle(style);
    feature.setId(id);

    return feature;
  }

  return (
    <>
      <StyledMap id="map" style={{ width: "100%", height: "400px" }} />;
    </>
  );
}

export default MapComponent;
