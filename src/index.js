// grabs all report table segments and footers that separate them
let nodeList = document.querySelectorAll('.report-table, .footer')
let tags = Array.from(nodeList)
let reports = []
let report = []

// Generate an array of report arrays
tags.forEach(tag => {
	let classes = tag.className.split(' ')
	if (!classes.includes('footer')) {
		report.push(tag)
	} else {
		reports.push(report.slice())
		report = []
	}
})

// Each element of a report is an Element class
let listings = []
reports.forEach(report => {
	let heading = report[0]
	let listing = {
		city: heading.querySelector('.town').innerText,
		address: heading.querySelector('.address').innerText,
		price: heading.querySelector('.price').innerText,
		metadata: {}
	}

	// Iterate through details (acres, rooms, etc.)
	let details = report[1]
	Array.from(details.querySelectorAll('.report-sub-row'))
		.forEach(subRow => {
			let keyTxt = subRow.querySelector('.report-row-label label').innerText
			let key = keyTxt.substring(0, keyTxt.length - 1)
			try {
				let value = Array.from(subRow.querySelectorAll('.report-row-label'))[1].innerText
				listing.metadata[key] = value
			} catch {
				listing.metadata[key] = undefined
			}
		})

	// Iterate through exterior info
	let exteriorData = report[4]
	Array.from(exteriorData.querySelectorAll('.report-row-label'))
		.forEach(subRow => {
			let keyTxt = subRow.querySelector('label').innerText
			let key = keyTxt.substring(0, keyTxt.length - 1)
			let value = subRow.innerText
			listing.metadata[key] = value.substring(keyTxt.length, value.length)
		})
	listings.push(listing)
})
