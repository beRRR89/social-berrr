import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import Pagination from "../../common/Pagination/Pagination";

describe("ProfileStatus component", () => {
	test("status from props should be in the state", () => {
		const component = create(<ProfileStatus status="social-berrr" />);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("social-berrr");
	});

	test("after creation <span> should be displayed", () => {
		const component = create(<ProfileStatus status="social-berrr" />);
		const root = component.root;
		let span = root.findByType("span");
		expect(span).not.toBeNull();
	});

	test("after creation <input> shouldn't be", () => {
		const component = create(<ProfileStatus status="social-berrr" />);
		const root = component.root;
		expect(()=> {
			root.findByType("input");
		}).toThrow();
	});

	test("after creation <span> should contains correct status", () => {
		const component = create(<ProfileStatus status="social-berrr" />);
		const root = component.root;
		let span = root.findByType("span");
		expect(span.children[0]).toBe("social-berrr");
	});

	test("<input> should be displayed in edit mode", () => {
		const component = create(<ProfileStatus status="social-berrr" />);
		const root = component.root;
		let span = root.findByType("span");
		span.props.onDoubleClick();
		let input = root.findByType("input");
		expect(input.props.value).toBe("social-berrr");
	});

	test("callback should be called", () => {
		const mockCallback = jest.fn();
		const component = create(<ProfileStatus status="social-berrr" updateUserStatus={mockCallback}/>);
		const instance = component.getInstance();
		instance.deactivateEditMode();
		expect(mockCallback.mock.calls.length).toBe(1);
	});

	test("span counts on page", () => {
		const component = create(<Pagination currentPage={1} totalItemsCount={50}  pageSize={5} portionSize={8}/>);
		const root = component.root;
		let spans = root.findAllByType("span");
		expect(spans.length).toBe(8);
	})
});