import joi from "joi";

export const WorkExperianceValidation = (data: any) => joi.object({
    vessel: joi.string(),
    vesselType: joi.string().valid("AHT","ASD","DSV","IBSV","LNG","OCV","OSV","PSV","ROV","SDW","Shoalbuster","SSDV","AHTS","Barge","Bitumen Tanker","Bulk carrier","Cable layer","CarCarrier","Cement Carrier","Chemical Tanker","Container","Crane vessel","Crew Boat","Cruise Ship","Dredger","Drilling Rig","Drillship","DSV","Dry Cargo","Emergency Rescue","Ferry","Fish Factory ship","Fishing","Fishing Protection","FPSO","FSIV DPI","Gas Tanker","General Cargo","Guard Vessel","Harbour Tug","Heavylift","Hydrographic","Ice-breaker","Jack-Up Barge","Landing Craft","Lash","Lifestock carrier","Lo-Ro","LPG","Minesweeper","Mooring Boat","Multipurpose","OBO","Oil Platform","Oil Tanker","Other","Passenger","Pilot Boat","Pipe Carier/Pipelay","Reefer","Research","Rock,Carrier","Ro-Lo","Ro-Pax","Ro-Ro","Sailing","Salvor","Seismic Support","Seismograph","Split.Hopper barge","Stand by vessel","Supply Vessel","Tanker","Trawler","Tug","Yacht","Vehicle Carrier","Well boat","WFSV"),
    flag: joi.string(),
     rank: joi.string().valid("MASTER", "COFF","2OFF","3OFF","4OFF","JOFF","CENG","1ENG","2ENG","3ENG","4ENG","ENG","JENG","EENG","ELEC","MECH",
     "PMAN","BOSUN","FRMAN","AB","Fitter","OS","DECK FITTER","MMAN","OILER","WELDER","WIPER","CHCOOK","COOK","STW","MESSM",
     "MSI","DCAD","ECAD","ENGINE FITTER"),
    dwt: joi.string(),
    grt: joi.string(),
    bhp: joi.string(),
    engineType: joi.string().valid("CAT","CAT 3516","CAT 360","Daihatsu","EMD","KUMERA","MACH","Rolls-Royce","6NVD","ABC",
    "Akasaka","B&W","BERGEN","C 32","CAT-3306","CAT-3412E","CATERPILLER","Cummins","D12D-C MH",
    "DC Electro Motor","Deutz","Wichmann","Diesel","FIAT","Frichs","GMT","Hanshin","KTA 19-M4",
    "KTA 50 M2 (HX)","MAK","MAN","MAN-B&W","MDDCF-5935846","MIRRLEES BLACKSTONE","Mitsubishi","Niigata","NIIGATA-6MG28HX","Nohab - Polar",
    "Other","Pilstick","POTAR","RD","KOBE DIESEL","RUSTON","SKL","SKODA","Steam Turbine",
    "STORK","Sulzer","Ulstein Aquamaster","VOLVO","Wartsila","YANMAR","Hyundai","8NVD","Ulstein Bergen","Industrie","MWM","BW-ALPHA","Blackstone","Alpha","BOLNES","Callesen","Grenaa Diesel"),
    startDate: joi.date(),
    endDate: joi.date(),
    manningAgentsOrOwners: joi.string(),
    reason: joi.string(),
}).validateAsync(data, { abortEarly: true })