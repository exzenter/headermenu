import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('header-dropdown/trigger', {
    edit: ({ attributes, setAttributes }) => {
        const { triggerText, dropdownId, hoverEnabled, hoverDelay } = attributes;

        const blockProps = useBlockProps({
            className: 'header-dropdown-trigger',
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Dropdown Settings', 'header-dropdown-menu')}>
                        <TextControl
                            label={__('Dropdown ID', 'header-dropdown-menu')}
                            help={__('Enter the ID of the Dropdown Content block to open.', 'header-dropdown-menu')}
                            value={dropdownId}
                            onChange={(value) => setAttributes({ dropdownId: value })}
                        />
                        <ToggleControl
                            label={__('Enable Hover Open', 'header-dropdown-menu')}
                            checked={hoverEnabled}
                            onChange={(value) => setAttributes({ hoverEnabled: value })}
                        />
                        {hoverEnabled && (
                            <RangeControl
                                label={__('Hover Delay (ms)', 'header-dropdown-menu')}
                                value={hoverDelay}
                                onChange={(value) => setAttributes({ hoverDelay: value })}
                                min={0}
                                max={1000}
                                step={50}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <RichText
                        tagName="span" // Using span to allow inline-block behavior safely
                        className="header-dropdown-trigger__text"
                        value={triggerText}
                        onChange={(value) => setAttributes({ triggerText: value })}
                        placeholder={__('Click to edit trigger...', 'header-dropdown-menu')}
                        allowedFormats={['core/bold', 'core/italic']}
                    />
                    {dropdownId ? (
                        <span className="trigger-id-badge">ID: {dropdownId}</span>
                    ) : (
                        <span className="trigger-id-badge warning">! No ID</span>
                    )}
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { triggerText, dropdownId, hoverEnabled, hoverDelay } = attributes;
        const blockProps = useBlockProps.save({
            className: 'header-dropdown-trigger',
            'data-dropdown-id': dropdownId,
            'data-hover-enabled': hoverEnabled,
            'data-hover-delay': hoverDelay,
            'aria-haspopup': 'true',
            'aria-expanded': 'false',
            'role': 'button',
            'tabIndex': 0
        });

        return (
            <div {...blockProps}>
                <RichText.Content
                    tagName="span"
                    className="header-dropdown-trigger__text"
                    value={triggerText}
                />
            </div>
        );
    },
});
