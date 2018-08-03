class Report {
	constructor(report) {
		const _state = {}
		_state.raw = report
		_vault.set(this, _state)
		parseReport(_state)
	}
}

function parseReport(_state) {

}

export default Report
