import { Component, Vue, Watch } from "vue-property-decorator";
import BaseVueComponent from '@/components/basic/BaseVueComponent';
import UniUtil from "@/publicUniTsLib/UniUtil";

interface ILabelAndValue {
	label: string;
	value: string;
}

@Component({}) //必须
export default class Index extends BaseVueComponent {

	onShow() { }

	onLoad() {
	}
	selectItem: string = "";
	iconName: string = "search";
	openSelect() {
		this.iconName = "photo";
		this.selectOpened = true;
	}
	selectConfirm(item: any) {
		if (!item) return;
		this.selectItem = item[0].label;
	}
	dataList: ILabelAndValue[] = [
		{ label: "请选择", value: "" },
		{ label: "湖南", value: "0" },
		{ label: "广东", value: "1" },
		{ label: "香港", value: "2" }
	];
	selectOpened: boolean = false;

}