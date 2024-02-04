import React from "react";
import "./application.css";

interface Props {
  crew: any;
}

export default function Contract({ crew }: Props) {
  const currentDate = new Date();
  const day = currentDate.getDate(); // 26
  const month = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = currentDate.getFullYear(); // 2023
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  console.log(crew, "crew ???????????????");
  return (
    <div
      id="appPage"
      // contentEditable={true}
      className=" flex flex-col overflow-hidden"
    >
      <img src="/images/header.jpg" alt="header" />

      <br />

      <table
        className="table-auto text-center"
        border={1}
        cellSpacing="0"
        cellPadding="0"
        align="left"
        // width="725"
      >
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p className=" pdfPadding">
                <b>
                  <span>Rank Applied For: </span>
                </b>
              </p>
            </td>
            <td
              // width="135"
              rowSpan={2}
            >
              <p className="MsoNormal pdfPadding">
                <span>{crew && crew.rank.label}</span>
              </p>
            </td>
            <td>
              <p className="MsoNormal pdfPadding">
                <b>
                  <span>Date of Availability:</span>
                </b>
              </p>
            </td>
            <td
            // width="189"
            >
              <p className="MsoNormal pdfPadding">
                <span>dd/mm/yyyy</span>
              </p>
            </td>
            <td
              // width="142"
              rowSpan={3}
              colSpan={1}
            >
              <p className=" pdfPadding w-10 h-10">
                <span></span>
              </p>
            </td>
            <td width={0} height={50}></td>
          </tr>
          <tr>
            <td
              // width="123"
              rowSpan={2}
            >
              <p className="MsoNormal pdfPadding">
                <b>
                  <span>Docs with agency :</span>
                </b>
              </p>
            </td>
            <td
              // width="189"
              rowSpan={2}
            >
              <p className=" pdfPadding">
                <b>Yes </b>
                <b>No </b>
              </p>
            </td>
            <td width={0} height={23}></td>
          </tr>
          <tr>
            <td
            // width="137"
            >
              <p className=" pdfPadding">
                <b>
                  <span>Last Wages</span>
                </b>
              </p>
            </td>
            <td
            // width="135"
            >
              <p className=" pdfPadding">
                
                  <span> </span>
               
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <br /> */}

      <p className=" text-[10px] flex flex-col pb-1 mt-2">
        <b>
          PERSONAL DESCRIPTION AND INFORMATION
        </b>
      </p>

      <table className="table-auto">
        <tbody>
          <tr>
            <td colSpan={6}>
              <p className="pdfPadding"><b>NAME (As per Passport)</b> </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pdfPadding"><b>First</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">{crew.firstname}</p>
            </td>

            <td>
              <p className="pdfPadding"><b>Last</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">{crew.lastname}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pdfPadding"><b>Birth Date</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.PersonalDetail[0].dob}</p>
            </td>
            <td>
              <p className="pdfPadding"><b>Place &amp; Country</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.PersonalDetail[0].country}</p>
            </td>
            <td>
              <p className="pdfPadding"><b>Nationality</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.PersonalDetail[0].nationality}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* travel detail  */}
      <br />
      <table className="table-auto">
        <tbody>
          <tr>
            <td>
              <p className="pdfPadding"><b>Passport No.</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">
                {crew.PassportDetail[0].passportNumber}
              </p>
            </td>
            <td>
              <p className="pdfPadding"><b>Place of Issue</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">
                {crew.PassportDetail[0].placeOfIssue}
              </p>
            </td>
            <td>
              <p className="pdfPadding"><b>Date of Issue</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.PassportDetail[0].dateOfIssue}</p>
            </td>
            <td>
              <p className="pdfPadding"><b>Date of Expiry</b></p>
            </td>
            <td key="de0">
              <p className="pdfPadding">
                {crew.PassportDetail[0].dateOfExpiry}
              </p>
            </td>
          </tr>
          {/* visa  */}
          {crew.VisaDetailModel[0].visaList.map((e: any) => (
            <tr>
              <td>
                <p className="pdfPadding"><b>Visa Type</b></p>
              </td>
              <td>
                <p className="pdfPadding">{e.visatype}</p>
              </td>
              <td>
                <p className="pdfPadding"><b>Number</b></p>
              </td>
              <td>
                <p className="pdfPadding">{e.number}</p>
              </td>
              <td>
                <p className="pdfPadding"><b>Place of Issue</b></p>
              </td>
              <td>
                <p className="pdfPadding">{e.placeOfIssue}</p>
              </td>
              <td>
                <p className="pdfPadding"><b>Date of Issue</b></p>
              </td>
              <td>
                <p className="pdfPadding">{e.dateOfIssue}</p>
              </td>
              <td>
                <p className="pdfPadding"><b>Date of Expiry</b></p>
              </td>
              <td key="de1">
                <p className="pdfPadding">{e.dateOfExpiry}</p>
              </td>
            </tr>
          ))}
          {/* visa end */}

          <tr>
            <td>
              <p className="pdfPadding"><b>U.S. Visa Type No.</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">{crew.VisaDetailModel[0].us_number}</p>
            </td>
            <td>
              <p className="pdfPadding"><b>Place of Issue</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">
                {crew.VisaDetailModel[0].us_placeOfIssue}
              </p>
            </td>
            <td>
              <p className="pdfPadding"><b>Date of Issue</b></p>
            </td>
            <td>
              <p className="pdfPadding">
                {crew.VisaDetailModel[0].us_dateOfIssue}
              </p>
            </td>
            <td>
              <p className="pdfPadding"><b>Date of Expiry</b></p>
            </td>
            <td>
              <p className="pdfPadding">
                {crew.VisaDetailModel[0].us_dateOfExpiry}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pdfPadding"><b>Covid vaccination Date:</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">
                {crew.MedicalDetail.Covid_vaccination.lastDoseDate}
              </p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">
                <b>Yellow fever vaccination expiry date:</b>
              </p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">
                {crew.MedicalDetail.Yellow_fever_vaccination.dateOfExpiry}
              </p>
            </td>
            <td>
              <p className="pdfPadding"><b>Medical certificate expiry date:</b></p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding"> </p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table
        className="table-auto"
        // border={1}
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr>
            <td colSpan={1} rowSpan={2}>
              <p className="pdfPadding">
                <b>
                  Permanent Address &amp; 
                </b>
              </p>
              <p className="pdfPadding">
                <b>
                  Contact Details
                </b>
              </p>
            </td>
            <td colSpan={6}>
              <p className="pdfPadding">
                {crew.PersonalDetail[0].flatnumber},{" "}
                {crew.PersonalDetail[0].society}, {crew.PersonalDetail[0].city},{" "}
                {crew.PersonalDetail[0].country},{" "}
                {crew.PersonalDetail[0].pincode}
              </p>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <p className="pdfPadding"><b>Mobile</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.phone_no}</p>
            </td>
            <td>
              <p className="pdfPadding"><b>Email</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.email}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table
        className="table-auto"
        // border={1}
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr>
            <td colSpan={1} rowSpan={2}>
              <p className="pdfPadding">
                <b>
                 Correspondence Address &amp; 
                </b>
              </p>
              <p className="pdfPadding">
                <b>
                 Contact Details
                </b>
              </p>
            </td>
            <td colSpan={6}>
              <p className="pdfPadding">
                {crew.PersonalDetail[0].isSameAddress
                  ? `${crew.PersonalDetail[0].flatnumber}, ${crew.PersonalDetail[0].society}, ${crew.PersonalDetail[0].city}, ${crew.PersonalDetail[0].country}, ${crew.PersonalDetail[0].pincode}`
                  : `${crew.PersonalDetail[0].flatnumber2}, ${crew.PersonalDetail[0].society2}, ${crew.PersonalDetail[0].city2}, ${crew.PersonalDetail[0].country2}, ${crew.PersonalDetail[0].pincode2}`}
              </p>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <p className="pdfPadding"><b>Mobile</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.alt_phone_no}</p>
            </td>
            <td>
              <p className="pdfPadding"><b>Email</b></p>
            </td>
            <td>
              <p className="pdfPadding">{crew.alt_email}</p>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      {/* marital status */}
      <table className="table-auto">
        <tbody>
          <tr>
            <td>
              <p className="pdfPadding"><b>Marital Status</b></p>
            </td>
            <td>
              <p className="pdfPadding">
                {crew.PersonalDetail[0].marital_status}
              </p>
            </td>

            <td>
              <p className="pdfPadding"><b>Nearest Airport</b></p>
            </td>
            <td>
              <p className="pdfPadding">
                {crew.PersonalDetail[0].nearest_airport}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <table className="table-auto" border={1} cellSpacing="0" cellPadding="0">
        <tbody>
          <tr>
            <td width="151" colSpan={2} rowSpan={2}>
              <p className="pdfPadding">
                <b>
                  <span>Next of Kin [Name, Address &amp; </span>
                </b>
              </p>
              <p className="pdfPadding">
                <b>
                  <span>Contact Details]</span>
                </b>
              </p>
            </td>

            <td>
              <p className="pdfPadding">Name</p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">{crew.KinDetail[0]?.fullName ?? ""}</p>
            </td>
            <td>
              <p className="pdfPadding">Relationship</p>
            </td>
            <td colSpan={2}>
              <p className="pdfPadding">{crew.KinDetail[0]?.relationship}</p>
            </td>
          </tr>
          <tr>
            <td colSpan={6}></td>
          </tr>
          <tr>
            <td>
              <p className="pdfPadding">Mobile</p>
            </td>
            <td colSpan={3}>
              <p className="pdfPadding">{crew.KinDetail[0]?.phoneNumber}</p>
            </td>
            <td>
              <p className="pdfPadding">Email</p>
            </td>
            <td colSpan={3}>
              <p className="pdfPadding">{crew.KinDetail[0]?.email}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Name of Wife
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Name of Children
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Birth
              </p>
            </th>
            {/* <th
              
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Birth
              </p>
            </th> */}
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Passport No.
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            {/* <th
              
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td className="  p-2">
              <p className="text-base pdfPadding">
                {crew.KinDetail[0]?.wifeDetail?.name}{" "}
              </p>
            </td>
            <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
              <p className="text-base pdfPadding">
                {crew.KinDetail[0]?.wifeDetail?.nameOfChild}{" "}
              </p>
            </td>
            <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
              <p className="text-base pdfPadding">
                {crew.KinDetail[0]?.wifeDetail?.dob}{" "}
              </p>
            </td>
            <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
              <p className="text-base pdfPadding">
                {crew.KinDetail[0]?.wifeDetail?.passportNumber}{" "}
              </p>
            </td>
            <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
              <p className="text-base pdfPadding">
                {crew.KinDetail[0]?.wifeDetail?.dateOfIssues}{" "}
              </p>
            </td>
            <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
              <p className="text-base pdfPadding">
                {crew.KinDetail[0]?.wifeDetail?.dateOfExpiry}{" "}
              </p>
            </td>
            {/* <td
              
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding">{crew.KinDetail[0].wifeDetail.name}  </p>
            </td>
            <td
              
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base">{crew.KinDetail[0].wifeDetail.name}  </p>
            </td> */}
          </tr>
        </tbody>
      </table>
      <br />
      <p className="MsoNormal pb-2">
        <b>
          <u>FOR OFFICER`S</u>
        </b>
      </p>

      <br />
      {/* Certificate of Competency */}
      <p className="MsoNormal pb-2">
        <b>
          <u>Certificate of Competency</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Grade</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Place / Country of Issue
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.CertificateOfCompentency?.map((e: any) => (
            <tr className="h-23">
              <td className="p-2">
                <p className="text-base pdfPadding">{e.grade} </p>
              </td>
              <td className="p-2">
                <p className="text-base pdfPadding">{e.licenseNumber} </p>
              </td>
              <td className="p-2">
                <p className="text-base pdfPadding">{e.dateOfIssue} </p>
              </td>
              <td className="p-2">
                <p className="text-base pdfPadding">{e.dateOfExpiry} </p>
              </td>
              <td className="p-2">
                <p className="text-base pdfPadding">{e.placeOfIssue} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      {/* Seaman Book (CDC) */}
      <p className="MsoNormal pb-2">
        <b>
          <u>Seaman Book (CDC)</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">SID</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">INDOS</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.SeamenBookDetail?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base pdfPadding">{e.number} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfExpiry} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.placeOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.sidNumber} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.Indos} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {/* Flag Endorsement */}
      <p className="MsoNormal pb-2">
        <b>
          <u>Flag Endorsement</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Name</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Place / Country of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Level</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.FlagEndorsement?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base pdfPadding">{e.name} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.number} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfExpiry} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.placeOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.Oil_tanker_DCE} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {/* Dangerous cargo endorsement */}
      <p className="MsoNormal pb-2">
        <b>
          <u>Dangerous cargo endorsement</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Name</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                OIL Tanker DCE
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.DangerousCargoEndorsement?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base  pb-2">{e.name}</p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.number} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfExpiry} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.placeOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.Oil_tanker_DCE} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <p className="MsoNormal pb-2">
        <b>
          <u>COURSES AND CERTIFICATION</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Name</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.CourseCertificate?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base pdfPadding">{e.courseName}</p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.certificateName} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfIssue} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfExpiry} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.placeOfIssue} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <p className="MsoNormal pb-2">
        <b>
          <u>
            PREVIOUS SEA EXPERIENCE OF LAST FIVE YEARS [Start with your last
            vessel served]
          </u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Vessel</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Type</p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">Flag</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Rank</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">DWT</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">GRT</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">BHP</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Engine
                <br />
                (only for Engineer`s)
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">From</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">To</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Reason{" "}
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Manning
                <br />
                Agents/Owners
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.WorkExperience?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base pdfPadding">{e.vessel}</p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.vesselType} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.flag} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.rank} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dwt} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.grt} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.bhp} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.engineType} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.startDate} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.endDate} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.reason} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">
                  {e.manningAgentsOrOwners}{" "}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <p className="MsoNormal pb-2">
        <b>
          <u>EDUCATIONAL BACKGROUND INCLUDINGPRE-SEA TRAINING</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Name of School / College Attended / Institute (Pre-Sea Training)
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                City / Country
              </p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">From</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">To</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Qualification Achieved
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.educationList?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base pdfPadding">{e.institution}</p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">
                  {e.city}/ {e.country}{" "}
                </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.startDate} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.endDate} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.qualification} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <p className="MsoNormal pb-2">
        <b>
          <u>References</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                COMPANY NAME
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Address
              </p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Person In charge
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Rank</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Phone</p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Email</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.References?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base pdfPadding">{e.companyName}</p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.address} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.personInCharge} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">
                  {e.titledOfPersonInCharge}{" "}
                </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.phoneNumber} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.email} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Question and answer */}

      <table>
        <tbody>
          <tr>
            <td colSpan={4} valign="top">
              <p className="MsoNormal">
                <span>
                  1) Are you involved in any marine accident / Investigations?
                </span>{" "}
                <span>Yes</span> <span>No</span> (
                <span>if YES please give details</span>)
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={4} valign="top">
              <p className="">
                <span>
                  2) Are you currently under medical treatment or taking
                  medication for existing conditions? Yes No (if YES please give
                  details)
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={4} valign="top">
              <p className="">
                <span>
                  3) Did you suffer or do you presently suffer from any diseases
                  likely to render you unfit for sea service or likely to
                  endanger the health of other persons onboard? Yes No (if YES
                  please give details)
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={4} valign="top">
              <p className="">
                <span>
                  4) Did you undergo Psychiatric treatment? Yes No (if YES
                  please give details as to when you had undergone)
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={4} valign="top">
              <p className="">
                <span>
                  5) Are you addicted to Alcohol or Drugs of any kind? Yes No
                  (if YES please give details)
                </span>
              </p>
            </td>
          </tr>
          {/* Repeat the above structure for the remaining rows */}
        </tbody>
      </table>

      <br />
      <table>
        <tbody>
          <tr>
            <td colSpan={4}>
              <p>
                <b>BANK DETAILS:</b>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Name of Bank</p>
            </td>
            <td>
              <p>{crew.BankDetail[0].bank_name}</p>
            </td>
            <td>
              <p>Full Bank Address</p>
            </td>
            <td>
              <p></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Name of A/c Holder</p>
            </td>
            <td>
              <p>{crew.BankDetail[0].account_holder_name}</p>
            </td>
            <td>
              <p>Branch Code</p>
            </td>
            <td>
              <p>{crew.BankDetail[0].branch_code}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Account No.</p>
            </td>
            <td>
              <p>{crew.BankDetail[0].account_number}</p>
            </td>
            <td>
              <p>Swift Code</p>
            </td>
            <td>
              <p>{crew.BankDetail[0].swift_code}</p>
            </td>
          </tr>
          {/* ... (similar structure for other rows) */}
        </tbody>
      </table>
      <br />

      {/* UNION REGISTERATION */}
      <p className=" pb-2">
        <b>
          <u>Union Registeration</u>
        </b>
      </p>
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Union Name
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Member Number
              </p>
            </th>

            <th>
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th>
              <p className="text-center text-xs font-bold pdfPadding">Rank</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          {crew.UnionRegistration?.map((e: any) => (
            <tr className="h-23">
              <td className="  p-2">
                <p className="text-base  pb-2">{e.unionName}</p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.membershipNumber} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.dateOfJoiningUnion} </p>
              </td>
              <td className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5">
                <p className="text-base pdfPadding">{e.rank} </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div className="justify-center ">
        <p className="text-center font-bold">
          Declaration to be made and signed by Applicant:
        </p>
        <p className=" font-bold text-xs">
          I hereby certify and confirm that the information’s contained above is
          true and factual, relevant documents wherever applicable will be shown
          on request. I have not withheld any information that would make my
          application unfavorable.
          <br />
          <br />
          I understand that a strict medical examination including Drug &
          Alcohol test as per company requirements is a condition of my
          employment and I express my willingness to be examined. I undertake to
          provide the Company’s medical officer full details of my previous
          medical history. I agree that the decision of the Company’s medical
          officer is final.
          <br />
          <br />I confirm that all my travel documents are valid and in order. I
          understand that if my travel documents at any time during the course
          of my employment become invalid or restricted and cannot be
          revalidated by me under normal process, making further travel or
          service by me is not possible, the contract of employment stands
          subject to cancellation and all costs of repatriation will be borne by
          me. I am / am not presently committed to any other company.
        </p>
      </div>

      <div className="justify-between flex flex-row mt-4">
        <div>
          <p className="">
            <b>__________________________________________</b>
          </p>
          <p className="">
            <b>Date:</b>
          </p>
        </div>
        <div>
          <p>
            <b>_______________________________</b>
          </p>
          <p> Signature of Applicant</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <table
        className="border-collapse border-non mx-auto "
        border={1}
        cellSpacing="0"
        cellPadding="0"
        width="715"
      >
        <tbody>
          <tr>
            <td width="715" valign="top">
              <p className="">
                <b>
                  <span>FOR OFFICE USE ONLY</span>
                </b>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <div className="text-center">
        <p className="font-bold underline">VERIFICATION OF DOCUMENTS</p>
        <p className="font-bold underline">&nbsp;</p>

        <table className="table-auto border-collapse border-none mx-auto">
          <tbody>
            <tr className="h-12">
              <td className="w-48  border border-black border-solid p-2">
                <p className="m-1">Original COC / Passport / CDC</p>
              </td>
              <td className="w-16  border border-black border-solid p-2">
                <p className="m-1 text-center">
                  <span className="text-base">Yes</span>
                </p>
              </td>
              <td className="w-20  border border-black border-solid p-2">
                <p className="m-1 text-center">
                  <span className="text-lg"> </span>
                  <span className="text-base">No</span>
                </p>
              </td>
              <td className="w-32  border border-black border-solid p-2">
                <p className="m-1">Signature of Office Staff</p>
              </td>
              <td className="w-40  border border-black border-solid p-2">
                <p className="m-1">&nbsp;</p>
              </td>
            </tr>
            <tr>
              <td className="w-48   border border-black border-solid p-2">
                <p className="m-1">STCW Courses and Training Certificates</p>
              </td>
              <td className="w-16  border border-black border-solid p-2">
                <p className="m-1 text-center">
                  <span className="text-base">Yes</span>
                </p>
              </td>
              <td className="w-20  border border-black border-solid p-2">
                <p className="m-1 text-center">
                  <span className="text-lg"> </span>
                  <span className="text-base">No</span>
                </p>
              </td>
              <td className="w-32  border border-black border-solid p-2">
                <p className="m-1">Signature of Office Staff</p>
              </td>
              <td className="w-40  border border-black border-solid p-2">
                <p className="m-1">
                  <span className="text-base">&nbsp;</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <img src="/images/footer.jpg" alt="footer" />
    </div>
  );
}
