import React from "react";
import "./application.css";

export default function Contract() {
  const currentDate = new Date();
  const day = currentDate.getDate(); // 26
  const month = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = currentDate.getFullYear(); // 2023
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return (
    <div
      id="appPage"
      contentEditable={true}
      className="WordSection1 flex flex-col overflow-hidden"
    >
      {/* <table className="MsoTableGrid w-full text-center" style={{
        // width: '544.05pt',
        borderCollapse: 'collapse', border: 'none', marginLeft: '6.75pt', marginRight: '6.75pt'
      }}>
        <tr>
          <td className="w-full" style={{ width: '544.05pt', border: 'solid windowtext 1.5pt', padding: '0in 5.4pt 0in 5.4pt' }}>
            <p>
              <b className="text-xl">
                APPLICATION FORM
              </b>
            </p>
            <p>
              <b className="text-sm">
                <img className="w-24 h-24" src="MAIN%20FLEET%20-Officer%20-Application%20Form_files/image001.png" alt="Application Form" />
              </b>
            </p>
            <p className="text-center">
              <b>
                <u className="text-lg font-serif">
                  SEASPEED MARINE SERVICES
                </u>
              </b>
            </p>
            <p className="text-black">
              <b>
                Registered with Seaman's Employment Office under Licence No. RPSL-MUM-162046 valid till 02.11.2025
              </b>
            </p>
            <p className="text-black">
              <b>
                Recruitment and Placement of Seafarers Rules 2016 & Regulation 1.4 of MLC 2006, as amended
              </b>
            </p>
            <p className="text-xl">
              IN: AAR-8200
            </p>
            <p className="text-center">
              <span className="lrzxr">
                <b> </b>
              </span>
            </p>
          </td>
        </tr>
      </table> */}

      <img src="/images/header.jpg" alt="header" />

      <br />

      <table
        className="MsoNormalTable text-center"
        border={1}
        cellSpacing="0"
        cellPadding="0"
        align="left"
        // width="725"
        style={{
          // width: '544.05pt',
          borderCollapse: "collapse",
          border: "none",
          marginLeft: "6.75pt",
          marginRight: "6.75pt",
        }}
      >
        <tbody>
          <tr style={{ height: "37.2pt" }}>
            <td
              // width="137"
              rowSpan={2}
              style={{
                width: "102.5pt",
                border: "solid windowtext 1.5pt",
                borderBottom: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.2pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>Rank Applied For: </span>
                </b>
              </p>
            </td>
            <td
              // width="135"
              rowSpan={2}
              style={{
                // width: '101.35pt',
                borderTop: "solid windowtext 1.5pt",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.5pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.2pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <span style={{ fontFamily: "Arial, sans-serif" }}></span>
              </p>
            </td>
            <td
              // width="123"
              style={{
                // width: '92.15pt',
                border: "solid windowtext 1.5pt",
                borderLeft: "none",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.2pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>
                    Date of Availability:
                  </span>
                </b>
              </p>
            </td>
            <td
              // width="189"
              style={{
                // width: '141.75pt',
                border: "solid windowtext 1.5pt",
                borderLeft: "none",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.2pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "3.0pt",
                  marginRight: "0in",
                  marginBottom: "3.0pt",
                  marginLeft: "0in",
                }}
              >
                <span className="MsoPlaceholderText">dd/mm/yyyy</span>
              </p>
            </td>
            <td
              // width="142"
              rowSpan={3}
              colSpan={1}
              style={{
                // width: '106.3pt',
                border: "solid windowtext 1.5pt",
                borderLeft: "none",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.2pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding w-10 h-10"
                style={{
                  marginTop: "3.0pt",
                  marginRight: "0in",
                  marginBottom: "3.0pt",
                  marginLeft: "0in",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    zIndex: 251665408,
                    marginLeft: "-4px",
                    marginTop: "0px",
                    width: "139px",
                    height: "126px",
                  }}
                >
                  {/* <table cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td width="139" height="126"   style={{ border: '.75pt solid black', verticalAlign: 'top', background: 'white' }}>
                        <span style={{ position: 'absolute', zIndex: 251665408 }}>
                          <table cellPadding="0" cellSpacing="0" width="100%">
                            <tbody>
                              <tr>
                                <td>
                                  <div style={{ padding: '4.35pt 7.95pt 4.35pt 7.95pt' }}>
                                    <p className="MsoNormal"   style={{ textAlign: 'center' }}>
                                      <span style={{ color: '#BFBFBF' }}>Insert Photo Here</span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </span>
                         
                      </td>
                    </tr>
                  </tbody>
                </table> */}
                </span>
              </p>
            </td>
            <td
              style={{ height: "37.2pt", border: "none" }}
              width={0}
              height={50}
            ></td>
          </tr>
          <tr style={{ height: "17.5pt" }}>
            <td
              // width="123"
              rowSpan={2}
              style={{
                // width: '92.15pt',
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.5pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.5pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>Docs with agency :</span>
                </b>
              </p>
            </td>
            <td
              // width="189"
              rowSpan={2}
              style={{
                // width: '141.75pt',
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.5pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.5pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <b>Yes </b>
                <b>No </b>
              </p>
            </td>
            <td
              style={{ height: "17.5pt", border: "none" }}
              width={0}
              height={23}
            ></td>
          </tr>
          <tr style={{ height: "37.5pt" }}>
            <td
              // width="137"
              style={{
                // width: '102.5pt',
                border: "solid windowtext 1.5pt",
                borderTop: "none",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.5pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>Last Wages</span>
                </b>
              </p>
            </td>
            <td
              // width="135"
              style={{
                // width: '101.35pt',
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.5pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "37.5pt",
              }}
            >
              <p
                className="MsoNormal pdfPadding"
                style={{
                  marginTop: "1.0pt",
                  marginRight: "0in",
                  marginBottom: "1.0pt",
                  marginLeft: "0in",
                }}
              >
                <b>
                  <span style={{ color: "#00B0F0" }}> </span>
                </b>
              </p>
            </td>
            {/* <td style={{ height: '37.5pt',width:'37.5pt', border: 'none' }} width={0} height={50}></td> */}
          </tr>
        </tbody>
      </table>

      <br />

      <p className="MsoNormal pdfPadding flex flex-col pb-2">
        <b>
          <u>PERSONAL DESCRIPTION AND INFORMATION</u>
        </b>
      </p>

      <table style={{ borderCollapse: "collapse", border: "none" }}>
        <tbody>
          <tr style={{ height: "9.1pt" }}>
            <td
              colSpan={6}
              style={{
                width: "544.05pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "9.1pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontWeight: "bold" }}
              >
                NAME (As per Passport)
              </p>
            </td>
          </tr>
          <tr style={{ height: "17.9pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                First
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            {/* <td style={{ width: '85.0pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.0pt' }}>Middle</p>
            </td>
            <td style={{ width: '76.5pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontSize: '9.0pt' }}> </p>
            </td> */}
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Last
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
          </tr>
          <tr style={{ height: "14.95pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Birth Date
              </p>
            </td>
            <td
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "85.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Place &amp; Country
              </p>
            </td>
            <td
              style={{
                width: "76.5pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "68.0pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Nationality
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p className="pdfPadding" style={{ fontSize: "9.0pt" }}>
                {" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* travel detail  */}
      <br />
      <table style={{ borderCollapse: "collapse", border: "none" }}>
        <tbody>
          <tr style={{ height: "17.9pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Passport No.
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "85.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Place of Issue
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "76.5pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Date of Issue
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Date of Expiry
              </p>
            </td>
            <td
              key="de0"
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
          {/* visa  */}
          <tr style={{ height: "17.9pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Visa Type
              </p>
            </td>
            <td
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Number
              </p>
            </td>
            <td
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "85.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Place of Issue
              </p>
            </td>
            <td
              style={{
                width: "76.5pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Date of Issue
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Date of Expiry
              </p>
            </td>
            <td
              key="de1"
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
          <tr style={{ height: "17.9pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                U.S. Visa Type
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "85.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Place of Issue
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "76.5pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Date of Issue
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Date of Expiry
              </p>
            </td>
            <td
              key="de2"
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
          <tr style={{ height: "17.9pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Covid vaccination Date:
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "85.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Yellow fever vaccination expiry date:
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "76.5pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Medical certificate expiry date:
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table
        className="MsoNormalTable"
        border={1}
        cellSpacing="0"
        cellPadding="0"
        style={{
          borderCollapse: "collapse",
          border: "none",
        }}
      >
        <tbody>
          <tr style={{ height: "12.75pt" }}>
            <td
              width="151"
              colSpan={1}
              rowSpan={2}
              style={{
                borderTop: "1.5pt solid",
                borderLeft: "1.5pt solid",
                borderBottom: "1.0pt solid",
                borderRight: "1.0pt solid",
                borderColor: "windowtext",
                borderStyle: "solid",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "12.75pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>
                    Permanent Address &amp;{" "}
                  </span>
                </b>
              </p>
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>Contact Details</span>
                </b>
              </p>
            </td>
            <td
              colSpan={6}
              style={{
                borderTop: "1.5pt solid windowtext",
                borderLeft: "none",
                borderBottom: "1.0pt solid windowtext",
                borderRight: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "12.75pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "9.0pt" }}> </span>
              </p>
            </td>
          </tr>
          <tr></tr>
          <tr style={{ height: "17.9pt" }}>
            {/* <td style={{ width: '64.6pt', border: '1.5pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt',  }}>
              <p className='pdfPadding' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '9.0pt' }}>STD Code</p>
            </td>
            <td style={{ width: '119.05pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt',  }}>
              <p className='pdfPadding' style={{ textAlign: 'center', fontSize: '9.0pt' }}> </p>
            </td>
            <td style={{ width: '85.0pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt',  }}>
              <p className='pdfPadding' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '9.0pt' }}>Res</p>
            </td>
            <td style={{ width: '76.5pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt',  }}>
              <p className='pdfPadding' style={{ textAlign: 'center', fontSize: '9.0pt' }}> </p>
            </td> */}
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Mobile
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "center", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Email
              </p>
            </td>
            <td
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table
        className="MsoNormalTable"
        border={1}
        cellSpacing="0"
        cellPadding="0"
        style={{
          borderCollapse: "collapse",
          border: "none",
        }}
      >
        <tbody>
          <tr style={{ height: "12.75pt" }}>
            <td
              width="151"
              colSpan={1}
              rowSpan={2}
              style={{
                borderTop: "1.5pt solid",
                borderLeft: "1.5pt solid",
                borderBottom: "1.0pt solid",
                borderRight: "1.0pt solid",
                borderColor: "windowtext",
                borderStyle: "solid",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "12.75pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>
                    Correspondence Address &amp;{" "}
                  </span>
                </b>
              </p>
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>Contact Details</span>
                </b>
              </p>
            </td>
            <td
              colSpan={6}
              style={{
                borderTop: "1.5pt solid windowtext",
                borderLeft: "none",
                borderBottom: "1.0pt solid windowtext",
                borderRight: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "12.75pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "9.0pt" }}> </span>
              </p>
            </td>
          </tr>
          <tr></tr>
          <tr style={{ height: "17.9pt" }}>
            {/* <td style={{ width: '64.6pt', border: '1.5pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.0pt' }}>STD Code</p>
            </td>
            <td style={{ width: '119.05pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontSize: '9.0pt' }}> </p>
            </td>
            <td style={{ width: '85.0pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.0pt' }}>Res</p>
            </td>
            <td style={{ width: '76.5pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontSize: '9.0pt' }}> </p>
            </td> */}
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Mobile
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Email
              </p>
            </td>
            <td
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      {/* marital status */}
      <table style={{ borderCollapse: "collapse", border: "none" }}>
        <tbody>
          <tr style={{ height: "17.9pt" }}>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Marital Status
              </p>
            </td>
            <td
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            {/* <td style={{ width: '85.0pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.0pt' }}>No. of Children</p>
            </td>
            <td style={{ width: '76.5pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontSize: '9.0pt' }}> </p>
            </td> */}
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Nearest Airport
              </p>
            </td>
            <td
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <table
        className="MsoNormalTable"
        border={1}
        cellSpacing="0"
        cellPadding="0"
        style={{
          borderCollapse: "collapse",
          border: "none",
        }}
      >
        <tbody>
          <tr style={{ height: "12.75pt" }}>
            <td
              width="151"
              colSpan={2}
              rowSpan={2}
              style={{
                borderTop: "1.5pt solid",
                borderLeft: "1.5pt solid",
                borderBottom: "1.0pt solid",
                borderRight: "1.0pt solid",
                borderColor: "windowtext",
                borderStyle: "solid",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "12.75pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>
                    Next of Kin [Name, Address &amp;{" "}
                  </span>
                </b>
              </p>
              <p
                className="pdfPadding"
                style={{
                  marginTop: "2.0pt",
                  marginRight: "0in",
                  marginBottom: "2.0pt",
                  marginLeft: "0in",
                  textAlign: "left",
                }}
              >
                <b>
                  <span style={{ fontSize: "9.0pt" }}>Contact Details]</span>
                </b>
              </p>
            </td>
            {/* <td

              colSpan={6}
              style={{

                borderTop: '1.5pt solid windowtext',
                borderLeft: 'none',
                borderBottom: '1.0pt solid windowtext',
                borderRight: '1.5pt solid windowtext',
                padding: '0in 5.4pt 0in 5.4pt',
                height: '12.75pt',
              }}
            >
              <p className='pdfPadding' style={{ marginTop: '2.0pt', marginRight: '0in', marginBottom: '2.0pt', marginLeft: '0in', textAlign: 'left' }}>
                <span style={{ fontSize: '9.0pt' }}> </span>
              </p>
            </td> */}
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Name
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Relationship
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            ></td>
          </tr>
          <tr style={{ height: "17.9pt" }}>
            {/* <td style={{ width: '64.6pt', border: '1.5pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.0pt' }}>STD Code</p>
            </td>
            <td style={{ width: '119.05pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontSize: '9.0pt' }}> </p>
            </td>
            <td style={{ width: '85.0pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '9.0pt' }}>Res</p>
            </td>
            <td style={{ width: '76.5pt', border: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '17.9pt' }}>
              <p className='pdfPadding' style={{ textAlign: 'left', fontSize: '9.0pt' }}> </p>
            </td> */}
            <td
              style={{
                width: "68.0pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Mobile
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "130.9pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.9pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ textAlign: "left", fontSize: "9.0pt" }}
              >
                {" "}
              </p>
            </td>
            <td
              style={{
                width: "64.6pt",
                border: "1.5pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "9.0pt",
                }}
              >
                Email
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "119.05pt",
                border: "1.0pt solid windowtext",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "14.95pt",
              }}
            >
              <p
                className="pdfPadding"
                style={{ fontSize: "10.5pt", fontFamily: "Arial, sans-serif" }}
              >
                {" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table-auto border border-collapse border-1">
        <thead>
          <tr className="h-17">
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Name of Wife
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Name of Children
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Birth
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Birth
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Passport No.
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Grade</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place / Country of Issue
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
            <td style={{ border: "solid windowtext 1.5pt" }}>
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">SID</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">INDOS</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Name</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place / Country of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Level</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Name</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                OIL Tanker DCE
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base  pb-2">OIL TANKER ENDORSEMENT</p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pb-2 ">CHEMICAL ENDORSEMENT</p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pb-2">GAS ENDORSEMENT</p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Name</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Number</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Issue
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Date of Expiry
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Place of Issue
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Vessel</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Type</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Flag</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Rank</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">DWT</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">GRT</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">BHP</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Engine
                <br />
                (only for Engineer`s)
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">From</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">To</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Reason{" "}
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
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
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Name of School / College Attended / Institute (Pre-Sea Training)</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">City / Country</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
              From
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                To
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
              Qualification Achieved
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
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
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">COMPANY NAME</p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">Address</p>
            </th>

            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
              Person In charge
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
                Rank
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
              Phone
              </p>
            </th>
            <th
              style={{
                border: "solid windowtext 1.5pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0in 5.4pt 0in 5.4pt",
                height: "17.0pt",
              }}
            >
              <p className="text-center text-xs font-bold pdfPadding">
              Email
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat the following row structure as needed */}
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2.5"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          <tr className="h-23">
            <td style={{ border: "solid windowtext 1.5pt" }} className="  p-2">
              <p className="text-base pdfPadding"></p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
            <td
              style={{ border: "solid windowtext 1.5pt" }}
              className="border-top-none border-left-none border-bottom-solid windowtext border-1.0 border-right-1.0 p-2"
            >
              <p className="text-base pdfPadding"> </p>
            </td>
          </tr>
          {/* End of repeated row structure */}
        </tbody>
      </table>

      {/* Question and answer */}
      
      <table>
      <tbody>
        <tr style={{ height: '24.75pt' }}>
          <td
            width={739}
            colSpan={4}
            valign="top"
            style={{
              width: '7.7in',
              borderTop: 'none',
              borderLeft: 'solid windowtext 1.5pt',
              borderBottom: 'dotted windowtext 1.0pt',
              borderRight: 'solid windowtext 1.5pt',
              padding: '0in 5.4pt 0in 5.4pt',
              height: '24.75pt'
            }}
          >
            <p className="MsoNormal">
              <span style={{ fontSize: '3.0pt' }}>&nbsp;</span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '9.0pt' }}>
                1) Are you involved in any marine accident / Investigations?
              </span>{' '}
             
              <span style={{ fontSize: '9.0pt' }}>Yes</span>{' '}
               <span style={{ fontSize: '9.0pt' }}>No</span>{' '}
              (<span style={{ fontSize: '8.0pt' }}>
                if YES please give details
              </span>
              )
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '8.0pt' }}>&nbsp;</span>
            </p>
          </td>
        </tr>
        <tr style={{ height: '24.75pt' }}>
          <td
            width={739}
            colSpan={4}
            valign="top"
            style={{
              width: '7.7in',
              borderTop: 'none',
              borderLeft: 'solid windowtext 1.5pt',
              borderBottom: 'dotted windowtext 1.0pt',
              borderRight: 'solid windowtext 1.5pt',
              padding: '0in 5.4pt 0in 5.4pt',
              height: '24.75pt'
            }}
          >
            <p className="MsoNormal">
              <span style={{ fontSize: '3.0pt' }}>&nbsp;</span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '9.0pt' }}>
              2) Are you currently under medical treatment or taking medication for existing conditions?  Yes   No (if YES please give details)
              </span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '8.0pt' }}>&nbsp;</span>
            </p>
          </td>
        </tr>
        <tr style={{ height: '24.75pt' }}>
          <td
            width={739}
            colSpan={4}
            valign="top"
            style={{
              width: '7.7in',
              borderTop: 'none',
              borderLeft: 'solid windowtext 1.5pt',
              borderBottom: 'dotted windowtext 1.0pt',
              borderRight: 'solid windowtext 1.5pt',
              padding: '0in 5.4pt 0in 5.4pt',
              height: '24.75pt'
            }}
          >
            <p className="MsoNormal">
              <span style={{ fontSize: '3.0pt' }}>&nbsp;</span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '9.0pt' }}>
              3) Did you suffer or do you presently suffer from any diseases likely to render you unfit for sea service or likely to endanger the health of other persons onboard?  Yes   No (if YES please give details)
              </span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '8.0pt' }}>&nbsp;</span>
            </p>
          </td>
        </tr>
        <tr style={{ height: '24.75pt' }}>
          <td
            width={739}
            colSpan={4}
            valign="top"
            style={{
              width: '7.7in',
              borderTop: 'none',
              borderLeft: 'solid windowtext 1.5pt',
              borderBottom: 'dotted windowtext 1.0pt',
              borderRight: 'solid windowtext 1.5pt',
              padding: '0in 5.4pt 0in 5.4pt',
              height: '24.75pt'
            }}
          >
            <p className="MsoNormal">
              <span style={{ fontSize: '3.0pt' }}>&nbsp;</span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '9.0pt' }}>
              4) Did you undergo Psychiatric treatment?  Yes   No (if YES please give details as to when you had undergone)
              </span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '8.0pt' }}>&nbsp;</span>
            </p>
          </td>
        </tr>
        <tr style={{ height: '24.75pt' }}>
          <td
            width={739}
            colSpan={4}
            valign="top"
            style={{
              width: '7.7in',
              borderTop: 'none',
              borderLeft: 'solid windowtext 1.5pt',
              borderBottom: 'dotted windowtext 1.0pt',
              borderRight: 'solid windowtext 1.5pt',
              padding: '0in 5.4pt 0in 5.4pt',
              height: '24.75pt'
            }}
          >
            <p className="MsoNormal">
              <span style={{ fontSize: '3.0pt' }}>&nbsp;</span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '9.0pt' }}>
               5) Are you addicted to Alcohol or Drugs of any kind? Yes   No (if YES please give details)
              </span>
            </p>
            <p className="MsoNormal">
              <span style={{ fontSize: '8.0pt' }}>&nbsp;</span>
            </p>
          </td>
        </tr>
        {/* Repeat the above structure for the remaining rows */}
      </tbody>
    </table>

      
<br />
    <table style={{ borderCollapse: 'collapse', border: 'none' }}>
      <tbody>
        <tr>
          <td colSpan={4} style={{ width: '7.7in', border: '1.5pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt' }}>
            <p><b>BANK DETAILS:</b></p>
          </td>
        </tr>
        <tr style={{ height: '10.65pt' }}>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}>Name of Bank</p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}></p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}>Full Bank Address</p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}></p>
          </td>
         
        </tr>
        <tr style={{ height: '10.65pt' }}>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}>Name of A/c  Holder</p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}></p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}>Branch Code</p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}></p>
          </td>
         
        </tr>
        <tr style={{ height: '10.65pt' }}>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}>Account No.</p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}></p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}>Swift Code</p>
          </td>
          <td style={{ width: '1.45in', border: 'none', borderTop: 'none', borderLeft: '1.5pt solid windowtext', borderBottom: '1.0pt solid windowtext', borderRight: '1.0pt solid windowtext', padding: '0in 5.4pt 0in 5.4pt', height: '10.65pt' }}>
            <p style={{ marginTop: '4.0pt', marginRight: '0in', marginBottom: '4.0pt', marginLeft: '0in', textAlign: 'justify' }}></p>
          </td>
         
        </tr>
        {/* ... (similar structure for other rows) */}
      </tbody>
    </table>




      <img src="/images/footer.jpg" alt="footer" />
    </div>
  );
}
