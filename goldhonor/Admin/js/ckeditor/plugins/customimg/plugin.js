CKEDITOR.plugins.add('customimg', {
    icons: 'customimg',
    init: function (editor) {
        editor.addCommand('insertCustomImage', {
            exec: function (editor) {
                if (!editor.window.$.customDialog) {
                    editor.window.$.customDialog = new MP.ImageDialog();
                    editor.window.$.customDialog.addEventListener('select', (function (evt) {

                        this.insertHtml('<img src="' + evt.image.url + '" />');

                    }).bind(editor));
                }
                editor.window.$.customDialog.show();
            }
        });

        editor.ui.addButton('customimg', {
            label: '插入图片',
            command: 'insertCustomImage',
            toolbar: 'insert'
        });

        
    }
});