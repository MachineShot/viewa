/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICast {
	adult: boolean;
	cast_id: number;
	character: string;
	credit_id: string;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	order: number;
	original_name: string;
	popularity: number;
	profile_path: string;
}
interface ICrew {
	adult: boolean;
	credit_id: string;
	department: string;
	gender: number;
	id: number;
	job: string;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
}

export interface IDetails {
	backdrop_path: string;
	poster_path?: string;
	id: number;
	overview: string;
	popularity: number;
	release_date: string;
	runtime: number;
	title: string;
	imdb_id: string;
	vote_average: number;
	vote_count: number;
	budget: number;
	revenue: number;
	genres: [
		{
			id: number;
			name: string;
		}
	];
	spoken_languages: string[];
	status: string;
	production_companies: string[];
	credits: {
		cast: ICast[];
		crew: ICrew[];
	};
	images: {
		posters: any[];
		backdrops: any[];
		logos: any[];
	};
	video: boolean;
}

export interface IList {
	id: number;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	media_type?: string;
	original_title?: string;
}

export interface IVideo {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: Date;
	id: string;
}

export interface ICountries {
	AE: AE;
	AL: Al;
	AR: AE;
	AT: AE;
	AU: AE;
	BA: AE;
	BB: Bb;
	BE: AE;
	BG: AE;
	BH: Al;
	BO: Bb;
	BR: Bb;
	BS: Bb;
	CA: AE;
	CH: AE;
	CL: AE;
	CO: AE;
	CR: Bb;
	CV: AE;
	CZ: AE;
	DE: AE;
	DK: AE;
	DO: Bb;
	EC: AE;
	EE: AE;
	EG: AE;
	ES: AE;
	FI: AE;
	FJ: Al;
	FR: AE;
	GB: AE;
	GF: Bb;
	GI: Bb;
	GR: AE;
	GT: Bb;
	HK: Bb;
	HN: Bb;
	HR: AE;
	HU: AE;
	ID: Bb;
	IE: AE;
	IL: AE;
	IN: AE;
	IQ: Bb;
	IS: AE;
	IT: AE;
	JM: Bb;
	JO: AE;
	JP: AE;
	KR: AE;
	KW: AE;
	LB: AE;
	LI: Bb;
	LT: AE;
	LV: AE;
	MD: AE;
	MK: AE;
	MT: AE;
	MU: AE;
	MX: Bb;
	MY: Bb;
	MZ: AE;
	NL: AE;
	NO: AE;
	NZ: AE;
	OM: AE;
	PA: Bb;
	PE: AE;
	PH: Bb;
	PK: Bb;
	PL: AE;
	PS: Bb;
	PT: AE;
	PY: Bb;
	QA: AE;
	RO: Bb;
	RS: AE;
	RU: AE;
	SA: AE;
	SE: AE;
	SG: Bb;
	SI: AE;
	SK: AE;
	SM: Bb;
	SV: Bb;
	TH: Bb;
	TR: AE;
	TT: Bb;
	TW: Bb;
	UG: AE;
	US: AE;
	UY: Bb;
	VE: AE;
	YE: Bb;
	ZA: AE;
}

export interface AE {
	link: string;
	flatrate?: Ad[];
	buy: Ad[];
	rent?: Ad[];
	ads?: Ad[];
}

export interface Ad {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

export interface Al {
	link: string;
	buy: Ad[];
}

export interface Bb {
	link: string;
	flatrate: Ad[];
}

export interface IPerson {
	adult: boolean;
	id: number;
	name: string;
	original_name: string;
	media_type: string;
	popularity: number;
	gender: number;
	known_for_department: string;
	profile_path: any;
	known_for: any[];
}
