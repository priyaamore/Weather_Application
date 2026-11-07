// name|state|lat|lon
const RAW = `Mumbai|Maharashtra|19.076|72.878;Pune|Maharashtra|18.520|73.857;Nagpur|Maharashtra|21.146|79.088;Nashik|Maharashtra|19.998|73.790;Aurangabad|Maharashtra|19.876|75.343;Kolhapur|Maharashtra|16.705|74.243;Solapur|Maharashtra|17.660|75.906;Thane|Maharashtra|19.218|72.978;Navi Mumbai|Maharashtra|19.033|73.030;Amravati|Maharashtra|20.933|77.752;Nanded|Maharashtra|19.138|77.321
;New Delhi|Delhi|28.614|77.209;Gurugram|Haryana|28.459|77.027;Faridabad|Haryana|28.409|77.313;Ambala|Haryana|30.378|76.776;Panipat|Haryana|29.391|76.970;Hisar|Haryana|29.149|75.722;Karnal|Haryana|29.686|76.990
;Noida|Uttar Pradesh|28.535|77.391;Ghaziabad|Uttar Pradesh|28.667|77.449;Lucknow|Uttar Pradesh|26.847|80.947;Kanpur|Uttar Pradesh|26.450|80.332;Varanasi|Uttar Pradesh|25.318|82.974;Agra|Uttar Pradesh|27.176|78.008;Prayagraj|Uttar Pradesh|25.436|81.846;Meerut|Uttar Pradesh|28.984|77.706;Gorakhpur|Uttar Pradesh|26.760|83.373;Bareilly|Uttar Pradesh|28.367|79.430;Aligarh|Uttar Pradesh|27.897|78.088;Mathura|Uttar Pradesh|27.492|77.673;Ayodhya|Uttar Pradesh|26.799|82.204;Jhansi|Uttar Pradesh|25.449|78.569
;Bengaluru|Karnataka|12.972|77.594;Mysuru|Karnataka|12.296|76.639;Mangaluru|Karnataka|12.914|74.856;Hubballi|Karnataka|15.364|75.124;Belagavi|Karnataka|15.850|74.498
;Chennai|Tamil Nadu|13.083|80.271;Coimbatore|Tamil Nadu|11.017|76.956;Madurai|Tamil Nadu|9.925|78.120;Tiruchirappalli|Tamil Nadu|10.790|78.705;Salem|Tamil Nadu|11.665|78.146;Tirunelveli|Tamil Nadu|8.713|77.756;Vellore|Tamil Nadu|12.916|79.133;Thanjavur|Tamil Nadu|10.787|79.139;Ooty|Tamil Nadu|11.410|76.695;Kodaikanal|Tamil Nadu|10.238|77.489
;Hyderabad|Telangana|17.385|78.487;Warangal|Telangana|17.969|79.594
;Visakhapatnam|Andhra Pradesh|17.687|83.219;Vijayawada|Andhra Pradesh|16.506|80.648;Guntur|Andhra Pradesh|16.307|80.437;Tirupati|Andhra Pradesh|13.629|79.419;Amaravati|Andhra Pradesh|16.573|80.358
;Thiruvananthapuram|Kerala|8.524|76.936;Kochi|Kerala|9.931|76.267;Kozhikode|Kerala|11.259|75.780;Thrissur|Kerala|10.527|76.214;Munnar|Kerala|10.089|77.060
;Kolkata|West Bengal|22.573|88.364;Howrah|West Bengal|22.596|88.264;Siliguri|West Bengal|26.727|88.395;Durgapur|West Bengal|23.552|87.321;Asansol|West Bengal|23.683|86.983
;Ahmedabad|Gujarat|23.023|72.572;Surat|Gujarat|21.170|72.831;Vadodara|Gujarat|22.307|73.181;Rajkot|Gujarat|22.304|70.802;Gandhinagar|Gujarat|23.215|72.637;Bhavnagar|Gujarat|21.765|72.152;Jamnagar|Gujarat|22.470|70.058
;Jaipur|Rajasthan|26.912|75.787;Jodhpur|Rajasthan|26.239|73.024;Udaipur|Rajasthan|24.586|73.713;Kota|Rajasthan|25.213|75.865;Ajmer|Rajasthan|26.450|74.639;Bikaner|Rajasthan|28.022|73.312;Jaisalmer|Rajasthan|26.916|70.908
;Bhopal|Madhya Pradesh|23.259|77.413;Indore|Madhya Pradesh|22.720|75.858;Gwalior|Madhya Pradesh|26.218|78.182;Jabalpur|Madhya Pradesh|23.182|79.987;Ujjain|Madhya Pradesh|23.180|75.784
;Patna|Bihar|25.594|85.137;Gaya|Bihar|24.796|85.004;Bhagalpur|Bihar|25.244|86.972;Muzaffarpur|Bihar|26.121|85.364
;Ranchi|Jharkhand|23.344|85.310;Jamshedpur|Jharkhand|22.805|86.203;Dhanbad|Jharkhand|23.795|86.430
;Bhubaneswar|Odisha|20.296|85.825;Cuttack|Odisha|20.463|85.883;Rourkela|Odisha|22.260|84.854;Puri|Odisha|19.813|85.831
;Raipur|Chhattisgarh|21.251|81.630;Bhilai|Chhattisgarh|21.209|81.379;Bilaspur|Chhattisgarh|22.080|82.139
;Chandigarh|Chandigarh|30.733|76.779;Ludhiana|Punjab|30.901|75.857;Amritsar|Punjab|31.634|74.872;Jalandhar|Punjab|31.326|75.576;Patiala|Punjab|30.340|76.387
;Shimla|Himachal Pradesh|31.105|77.173;Manali|Himachal Pradesh|32.240|77.189;Dharamshala|Himachal Pradesh|32.220|76.320
;Srinagar|Jammu & Kashmir|34.084|74.797;Jammu|Jammu & Kashmir|32.727|74.857;Leh|Ladakh|34.153|77.577
;Dehradun|Uttarakhand|30.316|78.032;Haridwar|Uttarakhand|29.946|78.164;Rishikesh|Uttarakhand|30.087|78.268;Nainital|Uttarakhand|29.391|79.456
;Guwahati|Assam|26.144|91.736;Dibrugarh|Assam|27.479|94.912;Silchar|Assam|24.833|92.779
;Shillong|Meghalaya|25.578|91.893;Imphal|Manipur|24.817|93.937;Aizawl|Mizoram|23.727|92.718;Kohima|Nagaland|25.675|94.110;Agartala|Tripura|23.831|91.287;Itanagar|Arunachal Pradesh|27.084|93.605;Gangtok|Sikkim|27.339|88.610
;Panaji|Goa|15.499|73.828;Margao|Goa|15.270|73.958;Puducherry|Puducherry|11.934|79.830;Port Blair|Andaman & Nicobar|11.623|92.726;Kavaratti|Lakshadweep|10.567|72.642;Daman|Daman & Diu|20.397|72.833;Silvassa|Dadra & Nagar Haveli|20.273|73.008`;

export const CITIES = RAW.split(";").map(s => s.trim().split("|")).filter(a => a.length === 4)
  .map(([name, state, lat, lon]) => ({ name, state, lat: +lat, lon: +lon }))
  .sort((a, b) => a.name.localeCompare(b.name));
