import './style.scss';
import {
	// Button,
	Element,
	Image,
	Switch,
} from '@components';
import { HTML, TEXT } from '@constants';
import React, { useCallback, useMemo, useState } from 'react';
import _orderBy from 'lodash/orderBy';
import { createClasses } from '@helpers';
import ENGLISH_DATA from '@data/english.json';
import HINDI_DATA from '@data/hindi.json';
import { useViewport } from '@hooks';

const Default = () => {
	const [isHindi, setIsHindi] = useState(false);
	const [cityListSortBy, setCityListSortBy] = useState('city_name');

	const viewport = useViewport();

	const isMobile = ['xxs', 'xs', 'sm'].some((x) => x === viewport);

	const DATA = isHindi ? HINDI_DATA : ENGLISH_DATA;

	const backgroundImage = DATA.hero_1_image;
	const title = DATA.hero_1_title;

	const cityList = () => {
		const arr = [];
		Object.entries(DATA).forEach(([key, value]) => {
			if (key.match(/compare-tabs_([0-9])_city/)) {
				const [, , , id, newKey] = key.split('_');
				if (!arr.some((obj) => obj.id === id)) {
					arr.push({
						id,
					});
				}
				const objIndex = arr.findIndex((obj) => obj.id === id);

				// aqi
				if (newKey === 'aqi') {
					const [num] = value.split(' ');
					arr[objIndex][newKey] = Number(num);
				// cigg
				} else if (newKey === 'cigg') {
					arr[objIndex][newKey] = Number(value);
				// any other properties
				} else {
					arr[objIndex][newKey] = value;
				}
			}
		});
		return arr;
	};

	const paragraphsList = () => {
		const arr = [];
		Object.entries(DATA).forEach(([key, value]) => {
			if (key.match(/p_([0-9])_value/)) {
				const [, id, newKey] = key.split('_');
				if (!arr.some((obj) => obj.id === id)) {
					arr.push({
						id,
					});
				}
				const objIndex = arr.findIndex((obj) => obj.id === id);

				arr[objIndex][newKey] = value;
			}
		});
		return arr;
	};

	const classes = createClasses({
		children: [
			'background',
			'backgroundImage',
			'backgroundOverlay',
			'sidebar',
			'sidebarInner',
			'sidebarHeader',
			'sidebarContent',
			'main',
			'mainInner',
			'headline',
			'switch',
			'cardList',
			'cardItem',
			'cardItemCol',
			'cardItemName',
			'cardItemAqi',
			'cardItemCigg',
			'scrollbar',
			'sortBy',
			'sortByField',
			'sortByControl',
			'body',
		],
		modifiers: [
			['mobile', isMobile]
		],
		namespace: 'view'
	});

	const handleSwitch = (value) => {
		if (value !== isHindi) {
			setIsHindi(value);
		}
	};

	const handleSortBy = (event) => {
		const v = event?.target?.value;
		if (v !== cityListSortBy) {
			setCityListSortBy(v);
		}
	};

	const renderCityList = () => useMemo(() => {
		let sortByProperty:string[] = ['name'];
		let sortBy:[] = ['asc'];

		// TODO: MOVE TO CONSTANTS
		switch (cityListSortBy) {
			case 'most_polluted':
				sortByProperty = ['aqi', 'cigg'];
				sortBy = ['desc', 'desc'];
				break;
			case 'least_polluted':
				sortByProperty = ['aqi', 'cigg'];
				sortBy = ['asc', 'asc'];
				break;
			default:
		}

		const sortedCityList = _orderBy(cityList(), sortByProperty, sortBy);
		return (
			<Element className={[classes.cardList]}>
				{
					sortedCityList.map((obj) => (
						<Element
							className={[classes.cardItem]}
							key={`key-${obj?.id}`}
						>
							<Element className={[classes.cardItemCol, classes.cardItemName]}>{obj.name}</Element>
							<Element className={classes.cardItemCol}>
								<Element className={classes.cardItemAqi}>
									{obj.aqi}<span>PM 2.5</span>
								</Element>
								<Element className={classes.cardItemCigg}>{obj.cigg}<span>Cigarettes</span></Element>
							</Element>
						</Element>
					))
				}
			</Element>
		);
	}, [cityList(), cityListSortBy]);

	const renderSortBy = () => (
		<Element className={classes.sortBy}>
			Sort By
			<Element className={classes.sortByField}>
				<Element
					className={classes.sortByControl}
					onChange={handleSortBy}
					tag={HTML.TAGS.SELECT}
				>
					<Element tag={HTML.TAGS.OPTION} value="city_name">City</Element>
					<Element tag={HTML.TAGS.OPTION} value="most_polluted">Most Polluted</Element>
					<Element tag={HTML.TAGS.OPTION} value="least_polluted">Least Polluted</Element>
				</Element>
			</Element>
		</Element>
	);

	const renderSwitch = () => (
		<Element className={[classes.switch]}>
			<p>{TEXT.ENGLISH}</p>
			<Switch
				isChecked={isHindi}
				onChange={handleSwitch}
			/>
			<p>{TEXT.HINDI}</p>
		</Element>
	);

	const renderBody = () => (
		<Element className={classes.body}>
			{paragraphsList().map((obj) => <p key={`paragraph-${obj.id}`}>{obj.value}</p>)}
		</Element>
	);

	return (
		<Element
			className={[classes.root, classes.modifiers.mobile]}
		>
			{/* SIDEBAR */}
			<Element
				className={[classes.main]}
				tag={HTML.TAGS.MAIN}
			>
				<Element className={[classes.mainInner]}>
					<h1 className={classes.headline}>{title}</h1>
					{renderBody()}
				</Element>
			</Element>
			{/* SIDEBAR */}
			<Element className={[classes.sidebar]}>
				<Element className={[classes.sidebarInner]}>
					<Element className={[classes.sidebarHeader]}>
						{renderSwitch()}
						{renderSortBy()}
					</Element>
					<Element className={[classes.sidebarContent, classes.scrollbar]}>
						{renderCityList()}
					</Element>
				</Element>
			</Element>
			{/* BACKGROUND OVERLAY */}
			<Element className={[classes.backgroundOverlay]} />
			{/* BACKGROUND IMAGE */}
			<Image
				alt="Pollution Image"
				classNames={{
					image: [classes.backgroundImage],
					root: [classes.background]
				}}
				src={backgroundImage}
			/>
		</Element>
	);
};

export default Default;
