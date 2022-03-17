interface LocationDataType {
  locationData: string;
}

const formattedLocation = (location: string) => {
  return (
    location
      // insert a space before all caps
      .replace(/([A-Z])/g, " $1")
      // uppercase the first character
      .replace(/^./, function (str: string) {
        return str.toUpperCase();
      })
  );
};

const Location = ({ locationData }: LocationDataType) => {
  return <div>Location: {formattedLocation(locationData)}</div>;
};
export default Location;
