<template>
  <div class="shortcutphone">
    <div class="shortcutphone-banner">
      <img :src="bannerImg" alt />
      <div class="shortcutphone-tip">
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAsCAYAAAAEuLqPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4QTEzQjY5RDExQzExRThCMUZGQjJBOTI3RTIwRUIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4QTEzQjZBRDExQzExRThCMUZGQjJBOTI3RTIwRUIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBMTNCNjdEMTFDMTFFOEIxRkZCMkE5MjdFMjBFQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjhBMTNCNjhEMTFDMTFFOEIxRkZCMkE5MjdFMjBFQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ATp5uAAADrElEQVR42ryYiU4TURSGp3QqRZRqEAkguIKCMShEFPdEcH0CH8FnMsYliismikYhGoON4r4mGItiQGMEBIkKLVha/2P+ScZmljvT1pt8oZR27n/OPdslEGk/oimuYlAE0iBF0vxbij/TGRjvzYGk1UN1TX01gFawmA9MgNkMfpt+iqgZMA6+gG8moZ4FiPX7wFFQxfd+gTiFxMmM6fcAGAW3wSR/9+WBQtAIWkyby1pANJOrU/SOcTwvKGjUynpVAUvBAYpwWmJhkGh0+13wEkzbfclNgDysHrSBGg/x8h1cAafAgNMHC1wsWg62gDq7M7RYU+AqOA/eu31YdxHQQusjiptLYPaBS+CZKRU9e0A2Lwc7QbNirEiQvQId4AmDT/MrIELXNzIF3ZZY+gHcJGOqwWInYBk4DGoVnzPGc+8CIx6C1VJAiJbvZgqqBJ2k20XwWvO4CiyCcgPYDqoVnyGbH+f5e166RdUTy3fxtdNKMtLF8ih7QFYCxBsraH2DS95LzX8LjoEbqhHvdgQVtH69QtH5yICTiJ/QslhmD0i1OwQqFb4XZJ1oo4AEgzHOum8moSJAuloTc79EQcBKeuwgBYyz3xuvzRjv/2TcGAOKiJ0VAWGwFWwDSzx4zmjH1RxAjNkgYfN6ikywR/SCmM6q186S63eFiIr3+umZlGGJBN0Odr58L5mMHoFutumkznOs/w+bj7BLngFveGx/PVDKkWmGU+98ujOX6xN7xWl2yn+CSfr3Z067IqaMlDLIgqwXBsbYpTqgDIHLLNfvrKK5m2W3kNabKSGLGKw17BUSL/MUNh/kfNDBymmZTsMuDymid4qZqhWK8+EAz/yc3eaqU7Ex84v714KFLtZLoYlxJjzhZqCXm1E5y3Wpw/mnmecS6Z08fy1XAjaDvYwHqzXHgeQCXT/oZx5wioNNnJLDNrOBDCRnGXDKY5mu+JlVYJ1Nr5CC8pw5ft3rTKgiIMJbcZ3NYPKUVstN6Gu2I5nVkm63B6zOeF863GNa3sk6r+VaQAHd35RxO5K0fMDNe/xurnI1q2Llq8y4ft1nwHVls7mbgBCjvpXFx9i8l7feW5xytHwJCHNIaeZRTHLzk+BeLjZ3EqBz7tvI1PvBf7V0sHnFc9Wn7QSU8XKyhpNtD9tpNJebOwmQlNvPOLjGM49yqNTyKSDAOaCWLbiPHa3X79XLq4AQr2eS8w/BnWzufX4EBDmGDVNAfzb3Pj8C0kyvGNvpdL5H5T8CDAD7Eff8JM0Z0AAAAABJRU5ErkJggg=="
            alt
          />
          <span>10分钟快捷回电</span>
        </div>
        <div style="padding-left: 20px; box-sizing: border-box;">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAArCAYAAAAUo/pwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MkI5NDgwRDExQzExRThBMzI0RDg4OUJENjkwRDNEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4MkI5NDgxRDExQzExRThBMzI0RDg4OUJENjkwRDNEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjgyQjk0N0VEMTFDMTFFOEEzMjREODg5QkQ2OTBEM0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjgyQjk0N0ZEMTFDMTFFOEEzMjREODg5QkQ2OTBEM0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz53zp6jAAADc0lEQVR42syZ2U9TQRTGb28vXYBQyhJQgQINaljUaNyJa1ATHzRRY0gk/ns++eCLPvmkMW7ENbgSg1ZUtlJaodBSv2O+Jg1p6HQ6t3CSX25Kb+9898yZOecMntDIqKVpQXAUXAUXQRuYAQ/BXfAULIGczsMdTVF1YAhcBufAXv49DNbBCsiCZyBZLWE22APG6K2dG74XkY3AB36D95bmIOVaAzgJrhQRlbd2TvMBerEqwupBL9hV4r4ecBp0VGMq6+mFCGPIu8m9TWAYfAAJ8BOsqQ7kDUSHVO+VKTkDbnMqRaSnxG8k1qJcsXNgFmRMeiwAjlDUeRBS/F0N2M2XSoM4mDAVY+KVTjACLpUhqtBaubUMmQx+P7eHAVBr6VsPF0KNKWFeLv9GqzKzy1lsKsIk9bRoTmGx/a1TZVxb4fsOBnB7haK8zKk3VTZdFY+FGB9hA1PZD44x11YkbJ1J2GOZsb+sQDImPCYP+sRrJZZjFngFUiaEzbN8+WrAY1JpPKfnKha2DN6Aj8yPupbmMyZUcqaKsCyncpIxp2vT4BsTurGyR3LcD06rjq0wvqbdqMdifHhaQ9gi+FzOArLLnIq3HETHY3MqQa8jbI5xltAQtspwWHZDWL4KTWkIm2fgL7ghTHrE1+B7maIS3L/G3fCYn2WPX7U03hBfK8yP9apjOgqCIkzifWAQ7NNo905xNY/Te5OlFpGzSUWxn0RZ+nRrVhkBvlAzO6wvYIohIVvIu2ILyinyuY1veJ3dUJi1lF1hlbGDzx5mBpEu/RG4Bx5zO8oWa99k8MNs/cfYFTUZElXY2HjpgBCr2X7G7yLF5go9FmSzMcrWP2JVx0TQQV4D3O/+J3nxmEPVt8ANvkW1LcwjhwxzctyhkLPgmsJ5hJsWYT8gm3hShB1n699lbb31cXFMSVBf0Nib3DQ5Xzshwg5tcs61FSahNWCzX/RtI2GyEHptS/Pw1kWTuG+1uQrWt5m4JVH3gE3toKHzCW0xLCYlwb+QDTZGr3kYa0HVoyIDlmMCl8Qu/xe4D+6IsxymgBnuuN1cDM084WlhvmxkLVVLgoq5M8OKN0mPpAo8M8ty/Q/Hj7HqkEo3k8+VctMT8LLg2KmL5U6+KghTYANF1vFeX4GHs6y7VnlNUsQCRcRZZv+ikBjHTvMl1vIVxj8BBgANOMVXbfZrmwAAAABJRU5ErkJggg=="
            alt
          />
          <span>精选问易老师</span>
        </div>
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAArCAYAAAAZvYo3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI3QjZEN0ZBRDExQzExRTg5NTM0OUY2RDA4RTIwMDQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI3QjZEN0ZCRDExQzExRTg5NTM0OUY2RDA4RTIwMDQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjdCNkQ3RjhEMTFDMTFFODk1MzQ5RjZEMDhFMjAwNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjdCNkQ3RjlEMTFDMTFFODk1MzQ5RjZEMDhFMjAwNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz54t+ZnAAAEaUlEQVR42qyY228UZRjGd2dnuz1wakUtLIdC1AqiCMrBREg0RBOMXOiFeqcx3vqfcM2NRr3TeLrQ4AkUJaaRQ9RaKoICFoGtnITW0i3bHZ+X/MZMJrszX2f4kl+23dM87+F73m+2WN70RCG2OsUa8aTYJu4TfaIp/hFj4oD4RBwXs4Ucy4/9XxYPi2fFY2KtuDvy+hLRL7rETTGBoNsioCQ2iZfF80TdavWK7TyeF3+L6awCvMjflupXxHMJFy/E3r+NLJXyCCiSVmuGHeIOx892iAfFuhalnJOATur+TKzeacuELxcr6Z3MAqyWD9F0XXP8/GIylqsEq8U9CJnr6gAvzy54gFRmWQ18IEi5RpmS1eO+4RN9f0YB/0Iz4T3WV+u5xrA4Ehdg0d+Z4eIW9RVxOcUN54nN4inxq3hb/CBmQgFVx30fXxb1n9BIeN9VLNya9QUEzZCJWZ8XOjMIsKhHxQi23G6ZU+4VC8Wr4mmemxLHfBQVMwg4J34SZ9r0QJXUW+P9LN5hx7wmdjLILnoZog+YAV+KH4mk1VolXhe7xUtk6SPxNVk3G9/gp2yh+Ja7Rs0PivfFH7H3mJH1MJxuiJrYgoAaovcy9G6Zn+84ya6L38RhHofE0Rapty33uOhG6LtkeDtDboSyjYYi/IQURpd18efiDcRMtql7H01mIj4TbxKxTcyNmN63CHhErPAQkHaq6cFwxhDTSOj4UUqxlT44S9bm83+JBrbmXORxqkkrg0W2gh2TtP6iyU5gbvfT+ZfIWBc77gZBVzxevO4wehc7WHaRwRQQ1AwXXcBzkzzvkYmmRzouO/SBZWEgZduWIh5xiHJU6fgpMhQQjA2oSY9uvegg4C4xiKMlecQ42+1D8QvRd+AZo3z+XsRe8HEyFwFLiOQAF2lnzxb9p6R/JmJa34jTuOM6+uC4P4cMLOIMmHZmrEPYE+YZx8Tv9NBOmtNKNOSj8BzbrCfhi8v0wBrGagf9EG7lazRZvCQjEbd9lPRbwN/bWC6VqqsCHGyQ5iilNNksh5hd4kUe1+N+E/hEUh/59MY+C8QEhB6+nC/uTNlmvdRwC9lYzT1CP2WaZlc1Wny2jpkNM0cmwwwEfPEGviTpELuA90SP4hWMapDXxxk+cbueIv2XQvMLMzBNauxovizj+bCI3S5DqB3XLqScF/8X0IS1+HVXIfvqwYbrNOuEi4BQRAXnGijkW71812mG0U0XAQ2ap8roLOcUMR8jOkU/pAoISFc3nb00zx0PPjGPMoy43J6H6yhntzM5M1CklANJY7yVgBomMcSZPs+qRH5V8VwFzGISH3MH08whIMAX+tod/dv9sGCG8QWDZylTMOtqsAsC1wxERdhB9K2kJnK4fatFDiKJu6DdcXyM9C0knRXHi9cp4Qc0diGLgAJb8ySRVJic3Q6R27jdI/YnHXpdBIS/A5zF28eZ/SWy4sXEDnNP8J74Km0nuQoIU1pDxESkpgGON87J5zt+RXXaxv8JMADzVS0QDZCivwAAAABJRU5ErkJggg=="
            alt
          />
          <span>电话沟通省时省力</span>
        </div>
        <div style="padding-left: 20px; box-sizing: border-box;">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAArCAYAAADlqKH9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI3NDUwMUIwRDExQzExRTg5RTU1Q0QwN0E0QUIyN0E4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI3NDUwMUIxRDExQzExRTg5RTU1Q0QwN0E0QUIyN0E4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mjc0NTAxQUVEMTFDMTFFODlFNTVDRDA3QTRBQjI3QTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mjc0NTAxQUZEMTFDMTFFODlFNTVDRDA3QTRBQjI3QTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4XqdGnAAACe0lEQVR42uyYW0tUURiGt7rLAkVLKUwxSPBKo5tEELqQii7sQrvyj/QXAn9FeEqzowheiKIX6YUpWRiEh9Q8YSrWeCBHZ3o/ejcsplm6955xDcL64IGBfVjPfN867qyCB81OkrgFWkC9Yy6GwFMwn3jB1TxwAZSCKwYlS9nuf5GteeAYRByzEWG7viUlYoYlte1lO+cgrKSVtJJW0kpaSStpJa3kuZOUDWjcsEtct/HVSe6AqGHJKNt1kh3EboACcJk3yj8qB1cNS0p7tWAJZNHtD/gtPx6BOnBHKXMuuGlYsgo8o5hX5a9gVCR/Ms3XQFkGx4dU83ZCl5sQv5xLFdUL+DEjaQUloJjpzmRIyVvBc8mkSMpZdxv8AL9AIftkpuIbeAnaWO5D9QuGSL7nAV0yeRdcNCwon1jegm4wrY5uNVZ50z4HUQ0HkYk5chG8Al3gs3pRyp34gAgug02QDyoMrEyz4DVoZ4ljifNkspA+2q+U/h7IOyNByeA7lviLbjLXRYSi+yzH/TSXPs5x0ANegCndje4pLxLBEb5QpBvSmNF5DtR2DpJYWElPdIClF9mHoChFQclgL0s8ddrNrs+XiuAwsxllRsOu7UsscacfwSCS3i5lnANpDzzhUhokvjODHRwkx+mW9DI6xrKL7GPn32dkP7FCQZkHPwXZr7ohS/YR7HLH0uhjGV3mRN0RVFA3mfsJGYkbYJ3ZLTmhjy4yg23sg0dBG3NTHKWSlUNmpglUyh9Xrq+BPs6DE2GPJGEzqcYWmKPAdeL1wTecByf9DpKzyKRX+gVOKxIHPIqMcZqZTPW8lA5JdQUZpKBsTD5wJUn5QPdXgAEAYF2hnA4VeIEAAAAASUVORK5CYII="
            alt
          />
          <span>限时优惠价{{price}}元</span>
        </div>
      </div>
    </div>
    <div class="shortcutphone-input">
      <div class="shortcutphone-input-time">
        <div class="label">服务时间：</div>
        <div>9:00-18:00</div>
      </div>
      <div class="shortcutphone-input-select">
        <div class="vux-selector weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label for="vux-selector-14q6k" class="weui-label">选择咨询类型：</label>
          </div>
          <div class="weui-cell__bd">
            <select id="vux-selector-14q6k" class="weui-select" v-model="value3">
              <option :value="item.key" v-for="(item,index) in list2" :key="index">{{item.value}}</option>
            </select>
          </div>
        </div>
        <div class="righticon">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMwM0Y3NUZGRUZCRTExRTg4M0IzQzgxNTUwRTQwN0QwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMwM0Y3NjAwRUZCRTExRTg4M0IzQzgxNTUwRTQwN0QwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzAzRjc1RkRFRkJFMTFFODgzQjNDODE1NTBFNDA3RDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzAzRjc1RkVFRkJFMTFFODgzQjNDODE1NTBFNDA3RDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7c9qMIAAABU0lEQVR42syXWQrCMBCGY/R6vngH9cHlAiqewQVP4YrHcLuD1guojwrOSCIqrW0zk2Xg7wIl+UgzH22hPD3MhBAVEWatJBzakEuAcDdIEwHPkG6AgMgUSXUzgWwCgttDxnihAR+QOuQeAByyVNX5DYh1gAwDAByrFRS/gFh9yNEjXPTbDzKuczwCNhVDIiDWGjL34TwVkQYoPLgx8c0lAbp2Y1ftv8yALt34dl5eQBdu/HJeXkAXbvxyngmgTTdGWfa5pHQYt/NMAbUbF7adRwHEakGuNp1HBUQ3dmw6jwqo3bi15TwOQPRV7Z+3KM7jANRuHNhwHhegduMpp/N6JhNJQic2XBhAEjZ8Vjei75amk0iiMtJW5qaeEb4A09zYy7lX2QH/uRE7dkQdnAMwzo0UX7IDxrkRnbfjGJgL8NONxs6LqxLznxm6scj01fOqpwADAPM+YLZfX3wGAAAAAElFTkSuQmCC"
            alt
          />
        </div>
      </div>
      <div class="shortcutphone-input-phone">
        <div class="label">填写接听手机：</div>
        <div class="phone">
          <input v-model="myPhone" type="text" id="phone" style="width: 231px;" />
        </div>
      </div>
    </div>
    <!---->
    <div class="masterdetail-say">
      <div class="masterdetail-say-title">【服务说明】</div>
      <div>1.支付成功后，问易君会尽快联系您；</div>
      <div>2.非服务时间下单，问易君会在次日联系您，请保持电话通畅；</div>
      <div>3.咨询老师由问易君为您匹配，咨询时间为10分钟；</div>
      <div>
        4.如有疑问，请联系
        <span>易君微信号:</span>
        <input value="wenyijunwx" id="weixin" class="weixin" />
        <button
          data-clipboard-text="wenyijunwx"
          data-clipboard-demo
          data-clipboard-action="copy"
          class="btn"
        >一键复制</button>
      </div>
    </div>
    <div class="masterdetail-pay">
      <div class="masterdetail-pay-money">
        <div>
          原价：
          <span>¥88</span>
        </div>
        <div>
          优惠价：
          <span>¥{{price}}</span>
        </div>
      </div>
      <div class="masterdetail-pay-btn">
        <div @click="reSureOrder">立即下单</div>
      </div>
    </div>
  </div>
</template>


<script>
import Clipboard from "clipboard";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      list2: [],
      value3: 0,
      commentCount: 0,
      commnetList: [],
      pageId: -1,
      price: 0,
      myPhone: "",
      bannerImg: ""
    };
  },
  methods: {
    copyText() {
      var that = this;
      if (Clipboard.isSupported()) {
        var clipboardDemos = new Clipboard(
          "[data-clipboard-demo]"
        ); /*创建方法*/
        /*复制成功回调*/
        clipboardDemos.on("success", function(e) {
          e.clearSelection();
          that.$vux.alert.show({
            content: "复制成功"
          });
          clipboardDemos.destroy();
        });
        /*复制失败回调*/
        clipboardDemos.on("error", function(err) {
          clipboardDemos.destroy();
        });
      } else {
        /*浏览器不支持时，进入手动复制方法*/

        that.$vux.alert.show({
          content: "您的浏览器暂不支持此功能！请手动复制"
        });
      }
    },

    getComment(pageId) {
      this.$http.post("quick_discuss", { pageId: pageId }).then(res => {
        this.commentCount = res.data.data.dis_num;
        if (res.data.data.dis_data.length > 0) {
          var arr = res.data.data.dis_data;
          arr.forEach(element => {
            this.commnetList.push(element);
          });
        }
      });
    },

    getMoreComment() {
      if (this.pageId == 1) {
        this.commnetLis = [];
      }
      this.pageId++;
      this.getComment(this.pageId);
    },

    reSureOrder() {
      if (!this.myPhone) {
        this.$vux.alert.show({
          content: "请填写手机号码"
        });
        return;
      }
      var arr = this.list2;
      var dan = {};
      arr.forEach(element => {
        if (element.key === this.value3) {
          dan = element;
        }
      });
      var kjObj = {
        phone: this.myPhone,
        classifyId: dan.key,
        name: dan.value,
        price: this.price,
        type: "快捷电话"
      };
      localStorage.setItem("orderMessage", JSON.stringify(kjObj));
      this.$router.push({ name: "sureOrder" });
    }
  },
  created() {
    this.getComment();
    this.$http.post("quick_phone").then(res => {
      var arr = res.data.data.cate_list;
      this.price = res.data.data.price;
      arr.forEach(element => {
        var obj = {};
        obj["key"] = element.id;
        obj["value"] = element.name;
        this.list2.push(obj);
      });
      this.value3 = this.list2["0"].key;
    });

    this.$http.post("get_carousel", { name: "快捷电话banner" }).then(res => {
      if (res.data.code == 200) {
        this.bannerImg = res.data.data.picurl;
      }
    });
  },
  mounted() {
    this.copyText();
    document.getElementById("phone").style.width =
      document.getElementsByClassName("weui-cell__bd")[0].offsetWidth + "px";
  }
};
</script>