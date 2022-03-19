interface DateDataType {
  dayData: number;
}

const Date = ({ dayData }: DateDataType) => {
  console.log(dayData);
  return (
    <div>
      {dayData !== 14
        ? `Date: April ${dayData} 2001`
        : `Date: Avril ${dayData} 2001`}
    </div>
  );
};
export default Date;
