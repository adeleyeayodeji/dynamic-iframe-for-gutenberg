/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {
  render() {
    const { attributes, setAttributes } = this.props;

    return (
      <InspectorControls key="inspector">
        <PanelBody title={__("Settings", "dynamic-iframe-for-wp")}>
          <TextControl
            label={__("Iframe URL", "dynamic-iframe-for-wp")}
            value={attributes.iframeSrc}
            onChange={(value) => {
              //check if the url is youtube with watch in it
              if (value.includes("youtube.com/watch")) {
                //get the video id
                var url = new URL(value);
                var videoId = url.searchParams.get("v");
                //generate the embed url
                let embedUrl = `https://www.youtube.com/embed/${videoId}`;
                //set the embed value
                value = embedUrl;
              }
              setAttributes({ iframeSrc: value });
            }}
          />
          <ToggleControl
            label={__("Allow fullscreen", "dynamic-iframe-for-wp")}
            checked={attributes.allowFullscreen}
            onChange={(value) => {
              setAttributes({ allowFullscreen: value });
            }}
          />
          <ToggleControl
            label={__("Add lazyload attribute", "dynamic-iframe-for-wp")}
            checked={attributes.useLazyload}
            onChange={(value) => {
              setAttributes({ useLazyload: value });
            }}
          />
        </PanelBody>
        <PanelBody title={__("Style options", "dynamic-iframe-for-wp")}>
          <TextControl
            label={__("Width", "dynamic-iframe-for-wp")}
            value={attributes.iframeWidth}
            onChange={(value) => {
              setAttributes({ iframeWidth: value });
            }}
          />
          <TextControl
            label={__("Height", "dynamic-iframe-for-wp")}
            value={attributes.iframeHeight}
            onChange={(value) => {
              setAttributes({ iframeHeight: value });
            }}
          />
          <ToggleControl
            label={__("Use !important", "dynamic-iframe-for-wp")}
            checked={attributes.useImportant}
            onChange={(value) => {
              setAttributes({ useImportant: value });
            }}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
