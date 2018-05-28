/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'zh-cn';
    //config.enterMode = CKEDITOR.ENTER_BR;
	config.allowedContent = true;
	config.forcePasteAsPlainText = true;
	config.toolbar = [
        ['FontSize', 'PasteText', '-', 'Blockquote', 'HorizontalRule', '-', 'RemoveFormat', '-', 'Link', 'Unlink', '-', 'customimg', '-', 'Maximize'],
        '/',
        ['Bold', 'Italic', 'Underline', 'Strike', 'TextColor', 'BGColor', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent']
	];

	config.removePlugins = 'elementspath,image';

	config.extraPlugins = 'customimg'

	config.resize_enabled = false;

	config.height = 400;

	config.contentsCss = '/admin/ckeditor/contents.css';
};
