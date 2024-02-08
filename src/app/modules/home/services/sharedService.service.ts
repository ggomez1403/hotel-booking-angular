import { Injectable } from '@angular/core';
import { Facility } from '../interfaces/facility.interface';
import { LuxuryRoom } from '../interfaces/luxuryRoom.interface';
import { Testimony } from '../interfaces/testimony.interface';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	public facilities: Facility[] = [
		{
			icon: 'fa-person-swimming',
			name: 'Swimming Pool'
		},
		{
			icon: 'fa-wifi',
			name: 'Wifi'
		},
		{
			icon: 'fa-bowl-food',
			name: 'Breakfast'
		},
		{
			icon: 'fa-dumbbell',
			name: 'Gym'
		},
		{
			icon: 'fa-gamepad',
			name: 'Game Center'
		},
		{
			icon: 'fa-lightbulb',
			name: '24/7 Light'
		},
		{
			icon: 'fa-spray-can-sparkles',
			name: 'Laundry'
		},
		{
			icon: 'fa-square-parking',
			name: 'Parking space'
		}
	];

	public luxuriousRooms: LuxuryRoom[] = [
		{
			imgSrc: 'https://i.imgur.com/qNjJeci.png',
			desc: 'Television set, Extra sheets and Breakfast',
			name: 'Single Room'
		},
		{
			imgSrc: 'https://i.imgur.com/mRWcxVN.png',
			desc: 'Television set, Extra sheets, Breakfast, and fireplace',
			name: 'Single Room'
		},
		{
			imgSrc: 'https://i.imgur.com/Ccldmc2.png',
			desc: 'Television set, Extra sheets, Breakfast, and fireplace, Console and bed rest',
			name: 'Suite Room'
		}
	];

	public testimonies: Testimony[] = [
		{
			date: '2 Mar. 2023',
			stars: [
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star'
			],
			desc: 'The service at the Paradise View was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results. We were particulary impressed with how the hotel staff anticipated our needs (periodically coming by the Board Room to check with us). Numerous conference attendees commented on the quality of the food, the quality of the service and overall positive attitude toward the conference site. Particular noteworthy is the longevity of the staff and that sense of investment in the success of every event. I usually offer suggestions for improvements (part of being a marketing professor), but there is absolutely nothing that could be improved – you have set the bar very high.',
			author: 'Anthony Bruff'
		},
		{
			date: '25 Mar. 2023',
			stars: [
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-regular fa-star-half-stroke'
			],
			desc: "Our stay at Paradise View was nothing short of exceptional. The service was top-notch, addressing every concern promptly and with a high level of satisfaction. The hotel staff's proactive approach in anticipating our needs, especially during our meetings in the Board Room, left a lasting impression. The conference was well-received, with attendees praising the quality of the food, the impeccable service, and the positive overall atmosphere. The dedication and longevity of the staff, evident in their commitment to the success of each event, were particularly noteworthy. As a marketing professor accustomed to providing feedback, I must say, there's little room for improvement – you've set the bar impressively high.",
			author: 'Regina Gella'
		},
		{
			date: '5 Apr. 2023',
			stars: [
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-solid fa-star',
				'fa-regular fa-star'
			],
			desc: "Paradise View exceeded expectations with outstanding service that promptly addressed every concern to our utmost satisfaction. The proactive approach of the hotel staff, particularly during our Board Room meetings, showcased their commitment to anticipating our needs. The conference garnered positive acclaim for its excellent food quality, impeccable service, and overall positive ambiance, as highlighted by attending guests. The staff's dedication and long-term commitment to event success were standout features, leaving a lasting impression. As a marketing professor providing feedback, I must commend Paradise View for setting an impressively high standard with little room for improvement.",
			author: 'Jamiyu Aliyu'
		}
	];
}
