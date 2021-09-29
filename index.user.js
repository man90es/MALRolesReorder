// ==UserScript==
// @name        MAL Roles Reorder
// @icon        https://raw.githubusercontent.com/octoman90/MALRolesReorder/master/assets/icon48.png
// @version     0.2.1
// @description On seiyuu and staff pages, display their roles in anime you're familiar with first
// @author      man90 (https://github.com/octoman90)
// @namespace   https://github.com/octoman90/MALRolesReorder/
// @updateURL   https://github.com/octoman90/MALRolesReorder/raw/master/index.user.js
// @downloadURL https://github.com/octoman90/MALRolesReorder/raw/master/index.user.js
// @supportURL  https://github.com/octoman90/MALRolesReorder/issues
// @license     GPL-3.0
// @match       https://myanimelist.net/people/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {
	"use strict"

	const style = document.createElement("style")
	style.innerText = `
		.normal_header + table > tbody,
		.normal_header + .js-navi-people-character + table > tbody {
			display: flex;
			flex-direction: column;
		}

		.normal_header + table > tbody > tr,
		.normal_header + .js-navi-people-character + table > tbody > tr {
			display: grid;
			grid-template-columns: 50px 1fr 1fr 50px;
			border-bottom: 1px solid #ebebeb;
		}

		.normal_header + table > tbody td,
		.normal_header + .js-navi-people-character + table > tbody td {
			border: none !important;
		}

		.reorder-main-role {
			order: -1;
		}

		.reorder-on-my-list {
			order: -2;
		}

		.reorder-on-my-list.reorder-main-role {
			order: -3;
		}
	`
	document.head.appendChild(style)

	// Assign a class to anime on user's list
	document.querySelectorAll(".normal_header + table > tbody > tr, .normal_header + .js-navi-people-character + table > tbody > tr")
		.forEach((entry) => {
			if (entry.querySelector(".button_edit")) {
				entry.classList.add("reorder-on-my-list")
			}

			if (entry.querySelector(".h3_character_name + .spaceit_pad")?.innerText.includes("Main")) {
				entry.classList.add("reorder-main-role")
			}
		})
})()
