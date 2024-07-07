import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class AIPlugin extends Plugin {
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add('aiPlugin', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Generate AI Content',
                withText: true,
                tooltip: true
            });

            view.on('execute', () => {
                const selection = editor.model.document.selection;
                const selectedText = selection.getSelectedText().toString();

                fetch('/ai-module/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: selectedText })
                })
                .then(response => response.json())
                .then(data => {
                    editor.model.change(writer => {
                        writer.insertText(data.generated_text, selection.getFirstPosition());
                    });
                });
            });

            return view;
        });
    }
}
