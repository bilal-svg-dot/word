document.addEventListener('DOMContentLoaded', function() {
    // currentPage katstocker num dyal page li active (1 = l page lewla)
    let currentPage = 1;
    // pagesContainer howa div li fih ga3 pages
    const pagesContainer = document.getElementById('pages');
    // pageTabs howa div li fih tabs dyal navigation
    const pageTabs = document.getElementById('pageTabs');

    // Kat3amer first page b editor1
    setupEditor('editor1');

    // Gestion dyal buttons dyal text formatting:
    document.getElementById('bold').addEventListener('click', function() { execCommand('bold'); });
    document.getElementById('italic').addEventListener('click', function() { execCommand('italic'); });
    document.getElementById('underline').addEventListener('click', function() { execCommand('underline'); });
    document.getElementById('alignLeft').addEventListener('click', function() { execCommand('justifyLeft'); });
    document.getElementById('alignCenter').addEventListener('click', function() { execCommand('justifyCenter'); });
    document.getElementById('alignRight').addEventListener('click', function() { execCommand('justifyRight'); });

    // Zid buttons dyal media f toolbar:
    createMediaButton('fas fa-image', 'Image', insertImage);
    createMediaButton('fas fa-video', 'Video mn PC', insertVideoFromDevice);
    createMediaButton('fas fa-music', 'Audio', insertAudio);

    // fontFamily select - katbedel type dyal font
    document.getElementById('fontFamily').addEventListener('change', function() {
        execCommand('fontName', false, this.value);
    });
    
    // fontSize select - katbedel taille dyal text
    document.getElementById('fontSize').addEventListener('change', function() {
        execCommand('fontSize', false, this.value);
    });

    // textColor input - katbedel loun dyal text
    document.getElementById('textColor').addEventListener('input', function() {
        execCommand('foreColor', false, this.value);
    });

    // addPage button 
    document.getElementById('addPage').addEventListener('click', addNewPage);
    // deletePage button 
    document.getElementById('deletePage').addEventListener('click', deletePage);

    // saveBtn button 
    document.getElementById('saveBtn').addEventListener('click', saveAsTxt);
    // openBtn button 
    document.getElementById('openBtn').addEventListener('click', openTxtFile);

    function createMediaButton(iconClass, text, clickHandler) {
        // Khdem button jdid
        const btn = document.createElement('button');
        // Zid icon w text f button
        btn.innerHTML = '<i class="' + iconClass + '"></i> ' + text;
        // Zid title (tooltip)
        btn.title = text;
        // Zid event click
        btn.addEventListener('click', clickHandler);
        // Zid button f toolbar
        document.querySelector('.toolbar').appendChild(btn);
        // Rje3 button li t3amert
        return btn;
    }

    // Hadi fonction bach tzid image
    function insertImage() {
        // Khdem input type file
        const input = document.createElement('input');
        // Set type dyal input l file
        input.type = 'file';
        // Accepte ghi les images
        input.accept = 'image/*';
        // Event fach ikhtar fichier
        input.onchange = function(e) {
            // hna kayeddi awel fichier khtareh l user
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                // Event fach ikml lecture
                reader.onload = function(event) {
                    // khod editor dyal page active
                    const activeEditor = document.querySelector('.page.active .editor');
                    // Ila kan editor
                    if (activeEditor) {
                        // Khdem balise img
                        const img = document.createElement('img');
                        // Set source dyal image
                        img.src = event.target.result;
                        img.style.maxWidth = '100%';
                        // Zid image f editor
                        activeEditor.appendChild(img);
                    }
                };
                // 9ra fichier bhal data URL
                reader.readAsDataURL(file);
            }
        };
        // Simuler click 3la input
        input.click();
    }

    // Hadi fonction bach tzid video
    function insertVideoFromDevice() {
        // Khdem input type file
        const input = document.createElement('input');
        // Set type dyal input l file
        input.type = 'file';
        // Accepte ghi les videos
        input.accept = 'video/*';
        // Event fach ikhtar fichier
        input.onchange = function(e) {
            // hna kayeddi awel fichier khtareh l user
            const file = e.target.files[0];
            if (file) {
                // Khdem FileReader
                const reader = new FileReader();
                // Event fach ikml lecture
                reader.onload = function(event) {
                    // Khod editor dyal page active
                    const activeEditor = document.querySelector('.page.active .editor');
                    if (activeEditor) {
                        // Khdem div bach ycontaini video
                        const videoContainer = document.createElement('div');
                        // Set class dyal div
                        videoContainer.className = 'video-container';
                        // Khdem balise video
                        const video = document.createElement('video');
                        // Set source dyal video
                        video.src = event.target.result;
                        // Zid controls (play/pause)
                        video.controls = true;
                        // Zid video f container
                        videoContainer.appendChild(video);
                        // Zid container f editor
                        activeEditor.appendChild(videoContainer);
                    }
                };
                // 9ra fichier bhal data URL
                reader.readAsDataURL(file);
            }
        };
        // Simuler click 3la input
        input.click();
    }
// partie : 2
    // Hadi fonction bach tzid audio
    function insertAudio() {
        // Khdem input type file
        const input = document.createElement('input');
        // Set type dyal input l file
        input.type = 'file';
        // Accepte ghi les fichiers audio
        input.accept = 'audio/*';
        // Event fach ikhtar fichier
        input.onchange = function(e) {
            // hna kayeddi awel fichier khtareh l user
            const file = e.target.files[0];
            if (file) {
                // Khdem FileReader
                const reader = new FileReader();
                // Event fach ikml lecture
                reader.onload = function(event) {
                    // Khod editor dyal page active
                    const activeEditor = document.querySelector('.page.active .editor');
                    // Ila kan editor
                    if (activeEditor) {
                        // Khdem balise audio
                        const audio = document.createElement('audio');
                        // Set source dyal audio
                        audio.src = event.target.result;
                        // Zid controls (play/pause)
                        audio.controls = true;
                        // Set width 100%
                        audio.style.width = '100%';
                        // Zid audio f editor
                        activeEditor.appendChild(audio);
                    }
                };
                // 9ra fichier bhal data URL
                reader.readAsDataURL(file);
            }
        };
        // Simuler click 3la input
        input.click();
    }

    // Hadi fonction bach tzid page jdida
    function addNewPage() {
        // Zid numero dyal page
        currentPage++;
        // Khdem id dyal page jdida
        const newPageId = 'page' + currentPage;
        // Khdem id dyal editor jdid
        const newEditorId = 'editor' + currentPage;

        // Khdem div dyal page jdida
        const newPage = document.createElement('div');
        // Set class dyal page
        newPage.className = 'page';
        // Set id dyal page
        newPage.id = newPageId;
        // Zid editor f page
        newPage.innerHTML = '<div id="' + newEditorId + '" class="editor" contenteditable="true">Page ' + currentPage + '</div>';
        // Zid page f container
        pagesContainer.appendChild(newPage);

        // Khdem tab jdida
        const newTab = document.createElement('div');
        // Set class dyal tab
        newTab.className = 'page-tab';
        // Set text dyal tab
        newTab.textContent = 'Page ' + currentPage;
        // Set data-page attribute
        newTab.dataset.page = newPageId;
        // Zid event click bach tswitchi l page
        newTab.addEventListener('click', function() { switchPage(newPageId); });
        // Zid tab f tabs container
        pageTabs.appendChild(newTab);

        // Switch l page jdida
        switchPage(newPageId);
        // dir editor dyal page jdida
        setupEditor(newEditorId);
    }

    // Hadi fonction bach tms7 page
    function deletePage() {
        // ila kant ba9ya gher page w7da(1) fl editor mat9derch tzed tmse7ha
        if (document.querySelectorAll('.page').length <= 1) {
            alert('mat9dercg tms7 had l page , khes 3la l a9al tkon page we7da fl editor!');
            return;
        }

        // Khod id dyal page active
        const activePageId = document.querySelector('.page.active').id;
        // Khod tab dyal page active
        const activeTabPage = document.querySelector('.page-tab[data-page="' + activePageId + '"]');

        if (activeTabPage) {
            // Ms7 page mn container
            document.getElementById(activePageId).remove();
            // Ms7 tab mn tabs
            activeTabPage.remove();

            // khod ga3 tabs li b9aw
            const remainingTabs = document.querySelectorAll('.page-tab');
            if (remainingTabs.length > 0) {
                // Switch l last page
                switchPage(remainingTabs[remainingTabs.length-1].dataset.page);
            }
        }
    }
//partie : 3
    // Hadi fonction bach tswitchi bin pages
    function switchPage(pageId) {
        // Ms7 class active mn kolchi pages
        document.querySelectorAll('.page').forEach(function(page) {
            page.classList.remove('active');
        });
        // Zid class active l page li ghadi nswitchiwlha
        document.getElementById(pageId).classList.add('active');

        // Nfs l7aja tabs
        document.querySelectorAll('.page-tab').forEach(function(tab) {
            tab.classList.remove('active');
        });
        // Zid class active l tab dyal page active
        document.querySelector('.page-tab[data-page="' + pageId + '"]').classList.add('active');
    }

    // Hadi fonction bach dir editor
    function setupEditor(editorId) {
        // Khod editor
        const editor = document.getElementById(editorId);
        // Zid event click bach yfocusi 3la editor
        editor.addEventListener('click', function() { editor.focus(); });
    }

    // Hadi fonction principale bach texecuti commandes dyal formatting
    function execCommand(command, showUI, value) {
        // Khod editor dyal page active
        const activeEditor = document.querySelector('.page.active .editor');
        if (activeEditor) {
            // Executi commande (bold, italic, etc.)
            document.execCommand(command, showUI || false, value || null);
            // Focus 3la editor
            activeEditor.focus();
        }
    }

    // Hadi fonction bach dir save ldak  content bhal fichier txt
    function saveAsTxt() {
        // Khod editor dyal page active
        const activeEditor = document.querySelector('.page.active .editor');
        // Ila makansh editor, khrej
        if (!activeEditor) return;

        // Khod text bla formatting
        const text = activeEditor.innerText;
        // Khdem blob dyal type txt
        const blob = new Blob([text], { type: 'text/plain' });
        // Khdem URL dyal blob
        const url = URL.createObjectURL(blob);
        // Khdem balise a
        const a = document.createElement('a');
        // Set href l url
        a.href = url;
        // Set smeya(name) dyal fichier
        a.download = 'page_' + document.querySelector('.page-tab.active').textContent + '.txt';
        // Simuler click bach ydownloader
        a.click();
        // Nettoyer URL
        URL.revokeObjectURL(url);
    }

    // Hadi fonction bach tft7 fichier txt
    function openTxtFile() {
        // Khdem input type file
        const input = document.createElement('input');
        // Set type dyal input l file
        input.type = 'file';
        // Accepte ghi fichiers texte
        input.accept = 'text/plain';
        // Event fach ikhtar fichier
        input.onchange = function(e) {
            // Khod fichier
            const file = e.target.files[0];
            // Khdem FileReader
            const reader = new FileReader();
            // Event fach ikml lecture
            reader.onload = function(event) {
                // Khod editor dyal page active
                const activeEditor = document.querySelector('.page.active .editor');
                if (activeEditor) {
                    // Zid content dyal fichier f editor
                    activeEditor.innerHTML = event.target.result;
                }
            };
            // 9ra fichier bhal txt
            reader.readAsText(file);
        };
        // Simuler click 3la input
        input.click();
    }

    // Zid event listeners lga3 tabs
    document.querySelectorAll('.page-tab').forEach(function(tab) {
        tab.addEventListener('click', function() { switchPage(tab.dataset.page); });
    });
});