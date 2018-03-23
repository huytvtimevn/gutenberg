/** @format */

import { reducer } from './';
import * as actions from '../actions/';

describe( 'Store', () => {
	describe( 'reducer', () => {
		// use scoped variables. See https://github.com/facebook/jest/issues/3553#issuecomment-300851842
		let __iniState;
		let initialState;

		beforeAll( () => {
			__iniState = {
				blocks: [
					{
						key: '0',
						blockType: 'title',
						content: 'Hello World',
						focused: false,
					},
					{
						key: '1',
						blockType: 'paragraph',
						content: 'paragraph content',
						focused: false,
					},
				],
				refresh: false,
			};
		} );

		beforeEach( () => {
			initialState = { ...__iniState };
		} );

		afterEach( () => {
			expect( initialState ).toEqual( __iniState );
		} );

		it( 'should focus a block', () => {
			let newState = reducer( initialState, actions.focusBlockAction( 0 ) );

			// the focused block should have its variable set to true
			expect( newState.blocks[ 0 ].focused ).toEqual( true );

			// the other block should have its variable set to false
			expect( newState.blocks[ 1 ].focused ).toEqual( false );

			// let's focus on the other block
			newState = reducer( initialState, actions.focusBlockAction( 1 ) );

			// the focused block should have its variable set to true
			expect( newState.blocks[ 1 ].focused ).toEqual( true );

			// the other block should have its variable set to false
			expect( newState.blocks[ 0 ].focused ).toEqual( false );
		} );

		it( 'should not be able to move top block up', () => {
			const newState = reducer( initialState, actions.moveBlockUpAction( 0 ) );

			// blocks should still be in the same places
			expect( newState.blocks[ 0 ].blockType ).toEqual( 'title' );
			expect( newState.blocks[ 1 ].blockType ).toEqual( 'paragraph' );
		} );

		it( 'should move a block up', () => {
			let newState = reducer( initialState, actions.moveBlockUpAction( 1 ) );

			// the paragraph block should have moved up
			expect( newState.blocks[ 0 ].blockType ).toEqual( 'paragraph' );

			// the block below it should be the title now
			expect( newState.blocks[ 1 ].blockType ).toEqual( 'title' );
		} );

		it( 'should not be able to move bottom block down', () => {
			const newState = reducer( initialState, actions.moveBlockDownAction( 1 ) );

			// blocks should still be in the same places
			expect( newState.blocks[ 0 ].blockType ).toEqual( 'title' );
			expect( newState.blocks[ 1 ].blockType ).toEqual( 'paragraph' );
		} );

		it( 'should move a block down', () => {
			let newState = reducer( initialState, actions.moveBlockDownAction( 0 ) );

			// the paragraph block should be at the top now
			expect( newState.blocks[ 0 ].blockType ).toEqual( 'paragraph' );

			// the title block should have moved down
			expect( newState.blocks[ 1 ].blockType ).toEqual( 'title' );
		} );
	} );
} );
