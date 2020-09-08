import * as momentjs from "moment"

function loadAbsoluteMoment(moment: string | number | Date, format?: momentjs.MomentFormatSpecification) {
	return momentjs.utc(moment, format)
}

function loadDuration(moment: string | number) {
	return momentjs.duration(moment)
}

function loadMoment(moment: string | number | Date, format?: momentjs.MomentFormatSpecification) {
	return momentjs.utc(moment, format).local()
}

function now() {
	return momentjs.utc(momentjs.now())
}

function nowLocale() {
	return momentjs.utc(momentjs.now()).local()
}

export type Moment = momentjs.Moment

export { loadAbsoluteMoment, loadDuration, loadMoment, now, nowLocale }

