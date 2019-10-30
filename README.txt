1. 	Unzip your Rise SCORM .zip file and

2. 	Navigate to the '[RISE COURSE]\scormcontent\' subfolder

3. 	Copy 'checkboxes.js' into this folder

4. 	Open 'index.html' in a text editor (e.g. Notepad++)

5. 	Search for the following line of code:
	
		<script type="text/javascript" src="lib/lzwcompress.js"></script>
	
	And paste this line below it:
	
		<script type="text/javascript" src="checkboxes.js"></script>
	
6.	Search for the following line of code:
	
		assign(cache, data);
	
	And paste these lines below it:
	
		saveCheckboxes();
		checkboxData = JSON.stringify(checkboxMap);
	
7.	Search for the following line of code:

		const data = JSON.parse(stringData);
		
	And REPLACE it with these lines:
	
		stringData = stringData.split("checkbox");
		convertSuspendedData(stringData[1]);
		const data = JSON.parse(stringData[0]);