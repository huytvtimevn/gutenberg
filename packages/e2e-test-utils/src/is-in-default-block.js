/**
 * Checks if the block that is focused is the default block.
 *
 * @return {Promise} Promise resolving with a boolean indicating if the focused block is the default block.
 */
export function isInDefaultBlock() {
	return page.evaluate( () => {
		const activeBlockName = document.activeElement
			.closest( '[data-type]' )
			.getAttribute( 'data-type' );
		const defaultBlockName = window.wp.blocks.getDefaultBlockName();

		return activeBlockName === defaultBlockName;
	} );
}
