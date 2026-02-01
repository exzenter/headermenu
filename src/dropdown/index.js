import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

registerBlockType('header-dropdown/content', {
    edit: ({ attributes, setAttributes, clientId }) => {
        const { blockId, maxWidth, position, verticalOffset, animationDuration, animationEasing, boxShadow, previewMode } = attributes;

        // Auto-generate ID if empty
        useEffect(() => {
            if (!blockId) {
                setAttributes({ blockId: `dropdown-${clientId.slice(0, 8)}` });
            }
        }, []);

        const blockProps = useBlockProps({
            className: 'header-dropdown-content-editor',
            style: {
                '--dropdown-max-width': maxWidth,
                '--dropdown-box-shadow': boxShadow
            }
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Dropdown Config', 'header-dropdown-menu')}>
                        <TextControl
                            label={__('Block ID', 'header-dropdown-menu')}
                            help={__('Use this ID in the Trigger block.', 'header-dropdown-menu')}
                            value={blockId}
                            onChange={(value) => setAttributes({ blockId: value })}
                        />
                        <ToggleControl
                            label={__('Preview Mode (Overlay)', 'header-dropdown-menu')}
                            help={__('Enable to see how it floats over content. Disable to edit content easily.', 'header-dropdown-menu')}
                            checked={previewMode || false}
                            onChange={(value) => setAttributes({ previewMode: value })}
                        />
                        <TextControl
                            label={__('Max Width', 'header-dropdown-menu')}
                            value={maxWidth}
                            onChange={(value) => setAttributes({ maxWidth: value })}
                            help="e.g. 600px, 80%, 100vw"
                        />
                        <SelectControl
                            label={__('Position', 'header-dropdown-menu')}
                            value={position}
                            options={[
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                                { label: 'Right', value: 'right' },
                            ]}
                            onChange={(value) => setAttributes({ position: value })}
                        />
                        <TextControl
                            label={__('Vertical Offset', 'header-dropdown-menu')}
                            value={verticalOffset}
                            onChange={(value) => setAttributes({ verticalOffset: value })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Visual & Animation', 'header-dropdown-menu')} initialOpen={false}>
                        <RangeControl
                            label={__('Animation Duration (ms)', 'header-dropdown-menu')}
                            value={animationDuration}
                            onChange={(value) => setAttributes({ animationDuration: value })}
                            min={0}
                            max={2000}
                            step={50}
                        />
                        <SelectControl
                            label={__('Animation Easing', 'header-dropdown-menu')}
                            value={animationEasing}
                            options={[
                                { label: 'Ease', value: 'ease' },
                                { label: 'Linear', value: 'linear' },
                                { label: 'Ease In', value: 'ease-in' },
                                { label: 'Ease Out', value: 'ease-out' },
                                { label: 'Ease In Out', value: 'ease-in-out' },
                            ]}
                            onChange={(value) => setAttributes({ animationEasing: value })}
                        />
                        <TextControl
                            label={__('Box Shadow', 'header-dropdown-menu')}
                            value={boxShadow}
                            onChange={(value) => setAttributes({ boxShadow: value })}
                            help="CSS box-shadow value (e.g. 0 10px 30px rgba(0,0,0,0.1))"
                        />
                    </PanelBody>
                </InspectorControls>
                <div
                    {...blockProps}
                    className={`${blockProps.className} ${previewMode ? 'is-preview-mode' : ''}`}
                    data-preview-position={position}
                >
                    <div className="editor-label">
                        {__('Dropdown Content', 'header-dropdown-menu')}
                        <span className="id-badge">ID: {blockId}</span>
                        {previewMode && <span className="preview-badge">PREVIEW</span>}
                    </div>
                    <InnerBlocks />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { blockId, maxWidth, position, verticalOffset, animationDuration, animationEasing, boxShadow } = attributes;
        const blockProps = useBlockProps.save({
            className: 'header-dropdown-content',
            'data-dropdown-block-id': blockId,
            'data-position-preference': position,
            style: {
                '--dropdown-max-width': maxWidth,
                '--dropdown-offset-top': verticalOffset,
                '--dropdown-anim-duration': `${animationDuration}ms`,
                '--dropdown-anim-easing': animationEasing,
                '--dropdown-box-shadow': boxShadow
            }
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
