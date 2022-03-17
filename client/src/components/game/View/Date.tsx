interface DateDataType {
  dayData: number;
}

const Date = ({ dayData }: DateDataType) => {
  return <div>{`Date: 10/${dayData}/04`}</div>;
};
export default Date;
