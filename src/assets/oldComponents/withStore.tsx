import { useEffect, useState } from "react";
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

function MapComponent() {
  const [map, setMap] = useState<Map | undefined>(undefined);

  const duckList: IDuck[] = useAppSelector(selectDucks);
  const rabbitList: IRabbit[] = useAppSelector(selectRabbits);

  useEffect(() => {
    if (!duckList.length || !rabbitList.length || map) return;
    createMap(); // await or something

    for (let index = 0; index < duckList.length; index++) {
      createVectorLayer(duckList[index]);
    }
    for (let index = 0; index < rabbitList.length; index++) {
      createVectorLayer(rabbitList[index]);
    }
    return () => {
      //map.dispose();
    };
  }, [duckList, rabbitList]);

  const createMap = () => {
    const newMap = new Map({
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
    setMap(newMap);
  };

  const createVectorLayer = ({
    latitude,
    longitude,
    img_src,
  }: {
    latitude: number;
    longitude: number;
    img_src: string;
  }): void => {
    var feature: Feature<Geometry> = addFeatureToLayer(latitude, longitude);
    var layer: VectorLayer<Vector<Geometry>> = new VectorLayer({
      source: new Vector({
        features: [
          feature
        ],
      }),
      style: new Style({
        image: new Icon({
          src: img_src,
          scale: 0.25,
        }),
        zIndex: 100,
      }),
    });
    const updatedMap = JSON.parse(JSON.stringify(map)); // it doesnt work
    updatedMap.addLayer(layer);
    setMap(updatedMap);
  };

  const addFeatureToLayer = (latitude: number, longitude: number): Feature => {
    return  new Feature({
      geometry: new Point(fromLonLat([latitude, longitude])),
    })
  }

  return (
    <>
      <StyledMap id="map" style={{ width: "100%", height: "400px" }} />;
    </>
  );
}

export default MapComponent;
