import { Trash2 } from "react-feather";

interface EducationDetail {
  institution: string;
  qualification: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
}
interface Props {
  data: EducationDetail[];
  onDelete(id: number): any;
}

const EducationDetailList = (props: Props) => {
  const listofData = props.data.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b">
      <td className="px-6 py-4">{item.institution}</td>
      <td className="px-6 py-4">{item.qualification}</td>
      <td className="px-6 py-4">{item.startDate}</td>
      <td className="px-6 py-4">{item.endDate}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.country}</td>
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            props.onDelete(index);
            // props.data.splice(index, 1);
            // updateEvent({ dataList: formEvent.dataList });
          }}
        />
      </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto">
      <table className="table-auto w-full text-sm text-left text-grey-500">
        <thead className="text-xs text-grey-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Institution
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Qualification
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{listofData}</tbody>
      </table>
    </div>
  );
};

export default EducationDetailList;
