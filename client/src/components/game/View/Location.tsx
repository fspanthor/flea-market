interface LocationDataType {
  locationData: string;
}

const Location = ({ locationData }: LocationDataType) => {
  return <div>Location: {locationData}</div>;
};
export default Location;
