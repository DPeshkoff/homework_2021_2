'use strict';

QUnit.module('Тестируем функцию plainify', function() {
    QUnit.test('plainify работает правильно', function(assert) {
        assert.deepEqual(plainify({ foo: 'bar', baz: 42 }), { 'foo': 'bar', 'baz': 42 });

        const nested1 = {
            deep: {
                foo: 'bar',
                baz: 42
            }
        };

        const plain1 = {
            'deep.foo': 'bar',
            'deep.baz': 42
        };

        assert.deepEqual(plainify(nested1), plain1);

        const nested2 = {
            deep: {
                foobar: 0,
                nested: {
                    object: {
                        fields: {
                            foo: 42,
                            bar: 42,
                            baz: 42
                        }
                    }
                }
            }
        };

        const plain2 = {
            'deep.foobar': 0,
            'deep.nested.object.fields.foo': 42,
            'deep.nested.object.fields.bar': 42,
            'deep.nested.object.fields.baz': 42
        };

        assert.deepEqual(plainify(nested2), plain2);
    });

    /* rip craziest test in my life */

    QUnit.test('plainify работает правильно с крупными примерами', function(assert) {
        /* g-man test */

        const _test_plainify_3_1 = {
            rise: {
                and: {
                    shine: {
                        mr: 'Freeman'
                    }
                },
                and: {
                    shine: {
                        not: {
                            that: {
                                i: {
                                    wish: {
                                        to: 'imply'
                                    }
                                },
                                you: 'have been',
                                sleeping: 'on the job'
                            }
                        },
                        no_one: 'is more deserving of a rest',
                        and: {
                            all: {
                                the: {
                                    effort: { in: {
                                            the: {
                                                location_1: 'world',
                                                location_2: 'earth'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            would: {
                have: {
                    gone: {
                        to: {
                            waste: {
                                until: '...'
                            }
                        }
                    }
                }
            },
            well: {
                lets: {
                    just: {
                        say: {
                            your_hour_has_come_again: true,
                            hours_slept: 175200
                        }
                    }
                },
                The: {
                    right: {
                        man: { in: {
                                the_right_place: false,
                                the_wrong_place: {
                                    can: {
                                        make: {
                                            all: {
                                                the: {
                                                    difference: 'in the world'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            },
            so: {
                wake: {
                    up: {
                        who: 'Mr.Freeman',
                        why: 'smell the ashes'
                    }
                }
            }
        };

        const _result_plainify_3_1 = {
            'rise.and.shine.and.all.the.effort.in.the.location_1': 'world',
            'rise.and.shine.and.all.the.effort.in.the.location_2': 'earth',
            'rise.and.shine.no_one': 'is more deserving of a rest',
            'rise.and.shine.not.that.i.wish.to': 'imply',
            'rise.and.shine.not.that.sleeping': 'on the job',
            'rise.and.shine.not.that.you': 'have been',
            'so.wake.up.who': 'Mr.Freeman',
            'so.wake.up.why': 'smell the ashes',
            'well.The.right.man.in.the_right_place': false,
            'well.The.right.man.in.the_wrong_place.can.make.all.the.difference': 'in the world',
            'well.lets.just.say.hours_slept': 175200,
            'well.lets.just.say.your_hour_has_come_again': true,
            'would.have.gone.to.waste.until': '...'
        };

        assert.deepEqual(plainify(_test_plainify_3_1), _result_plainify_3_1, 'G-Man test');

        /* sgml test */

        const _test_plainify_3_2 = {
            glossary: {
                title: 'example glossary',
                GlossDiv: {
                    title: 'S',
                    GlossList: {
                        GlossEntry: {
                            ID: 'SGML',
                            SortAs: 'SGML',
                            GlossTerm: 'Standard Generalized Markup Language',
                            Acronym: 'SGML',
                            Abbrev: 'ISO 8879:1986',
                            GlossDef: {
                                para: 'A meta-markup language, used to create markup languages such as DocBook.',
                                GlossSeeAlso: ['GML', 'XML']
                            },
                            GlossSee: 'markup'
                        }
                    }
                }
            }
        };

        const _result_plainify_3_2 = {
            'glossary.title': 'example glossary',
            'glossary.GlossDiv.title': 'S',
            'glossary.GlossDiv.GlossList.GlossEntry.SortAs': 'SGML',
            'glossary.GlossDiv.GlossList.GlossEntry.ID': 'SGML',
            'glossary.GlossDiv.GlossList.GlossEntry.GlossTerm': 'Standard Generalized Markup Language',
            'glossary.GlossDiv.GlossList.GlossEntry.GlossSee': 'markup',
            'glossary.GlossDiv.GlossList.GlossEntry.Abbrev': 'ISO 8879:1986',
            'glossary.GlossDiv.GlossList.GlossEntry.Acronym': 'SGML',
            'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso.0': 'GML',
            'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso.1': 'XML',
            'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para': 'A meta-markup language, used to create markup languages such as DocBook.'
        };

        assert.deepEqual(plainify(_test_plainify_3_2), _result_plainify_3_2, 'SGML test');
    });

    QUnit.test('plainify работает правильно на большом числе повторов (15)', function(assert) {

        /* using arduino test data */

        const _test_plainify_4_1 = {
            message1: {
                iteration: 740,
                content: {
                    temperature: 482,
                    brightness: 362
                }
            },
            message2: {
                iteration: 741,
                content: {
                    temperature: 481,
                    brightness: 360
                }
            },
            message3: {
                iteration: 742,
                content: {
                    temperature: 482,
                    brightness: 341
                }
            },
            message4: {
                iteration: 743,
                content: {
                    temperature: 486,
                    brightness: 197
                }
            },
            message5: {
                iteration: 744,
                content: {
                    temperature: 481,
                    brightness: 289
                }
            },
            message6: {
                iteration: 745,
                content: {
                    temperature: 480,
                    brightness: 284
                }
            },
            message7: {
                iteration: 746,
                content: {
                    temperature: 480,
                    brightness: 89
                }
            },
            message8: {
                iteration: 747,
                content: {
                    temperature: 481,
                    brightness: 98
                }
            },
            message9: {
                iteration: 748,
                content: {
                    temperature: 481,
                    brightness: 104
                }
            },
            message10: {
                iteration: 749,
                content: {
                    temperature: 482,
                    brightness: 116
                }
            },
            message11: {
                iteration: 750,
                content: {
                    temperature: 482,
                    brightness: 99
                }
            },
            message12: {
                iteration: 751,
                content: {
                    temperature: 481,
                    brightness: 206
                }
            },
            message13: {
                iteration: 752,
                content: {
                    temperature: 481,
                    brightness: 148
                }
            },
            message14: {
                iteration: 753,
                content: {
                    temperature: 480,
                    brightness: 157
                }
            },
            message15: {
                iteration: 754,
                content: {
                    temperature: 480,
                    brightness: 161
                }
            }

        };

        const _result_plainify_4_1 = {
            'message1.iteration': 740,
            'message1.content.temperature': 482,
            'message1.content.brightness': 362,
            'message2.iteration': 741,
            'message2.content.temperature': 481,
            'message2.content.brightness': 360,
            'message3.iteration': 742,
            'message3.content.temperature': 482,
            'message3.content.brightness': 341,
            'message4.iteration': 743,
            'message4.content.temperature': 486,
            'message4.content.brightness': 197,
            'message5.iteration': 744,
            'message5.content.temperature': 481,
            'message5.content.brightness': 289,
            'message6.iteration': 745,
            'message6.content.temperature': 480,
            'message6.content.brightness': 284,
            'message7.iteration': 746,
            'message7.content.temperature': 480,
            'message7.content.brightness': 89,
            'message8.iteration': 747,
            'message8.content.temperature': 481,
            'message8.content.brightness': 98,
            'message9.iteration': 748,
            'message9.content.temperature': 481,
            'message9.content.brightness': 104,
            'message10.iteration': 749,
            'message10.content.temperature': 482,
            'message10.content.brightness': 116,
            'message11.iteration': 750,
            'message11.content.temperature': 482,
            'message11.content.brightness': 99,
            'message12.iteration': 751,
            'message12.content.temperature': 481,
            'message12.content.brightness': 206,
            'message13.iteration': 752,
            'message13.content.temperature': 481,
            'message13.content.brightness': 148,
            'message14.iteration': 753,
            'message14.content.temperature': 480,
            'message14.content.brightness': 157,
            'message15.iteration': 754,
            'message15.content.temperature': 480,
            'message15.content.brightness': 161
        };

        assert.deepEqual(plainify(_test_plainify_4_1), _result_plainify_4_1, 'Arduino messages (15) test');

    });

    QUnit.test('plainify работает правильно с символами из utf-8', function(assert) {

        /* using utf-8 */

        const _test_plainify_5_1 = {
            你好: {
                мы: {
                    are: {
                        '❤': {
                            科技园: true
                        }
                    }
                }
            }

        };

        const _result_plainify_5_1 = {
            '你好.мы.are.❤.科技园': true
        };

        assert.deepEqual(plainify(_test_plainify_5_1), _result_plainify_5_1, 'UTF-8 test');

        /* mfa test */

        const _test_plainify_5_2 = {
            ʑ: {
                m̰: {
                    ꜛe: 0,
                    n̩: 2
                },
                w̰: {
                    ǂ: 'yes'
                },
                ɧ: {
                    t͡s: 0,
                    d͡z: 1,
                    t͡ʃ: 2,
                    d͡ʒ: 3,
                    t͡ɕ: 4,
                    d͡ʑ: 5,
                    t͡ɬ: 6,
                    k͡p: 7,
                    ɡ͡b: 8,
                    ŋ͡m: 9
                }
            }

        };

        const _result_plainify_5_2 = {
            'ʑ.m̰.ꜛe': 0,
            'ʑ.m̰.n̩': 2,
            'ʑ.w̰.ǂ': 'yes',
            'ʑ.ɧ.t͡s': 0,
            'ʑ.ɧ.d͡z': 1,
            'ʑ.ɧ.t͡ʃ': 2,
            'ʑ.ɧ.d͡ʒ': 3,
            'ʑ.ɧ.t͡ɕ': 4,
            'ʑ.ɧ.d͡ʑ': 5,
            'ʑ.ɧ.t͡ɬ': 6,
            'ʑ.ɧ.k͡p': 7,
            'ʑ.ɧ.ɡ͡b': 8,
            'ʑ.ɧ.ŋ͡m': 9
        };

        assert.deepEqual(plainify(_test_plainify_5_2), _result_plainify_5_2, 'MFA test');

    });

    QUnit.test('plainify работает правильно с массивами', function(assert) {

        const _test_plainify_6_1 = ['Alyosha Popovich', 'Dobrynya Nikitich', 'Ilya Muromets'];

        const _result_plainify_6_1 = undefined;

        assert.deepEqual(plainify(_test_plainify_6_1), _result_plainify_6_1, "'Alyosha Popovich ', 'Dobrynya Nikitich ', 'Ilya Muromets ' -> undefined");

        /* mfa test */

        const _test_plainify_6_2 = [{
                'name': 'Alice',
                'energy': 0
            },
            {
                'name': 'Bob',
                'energy': 146
            },
            {
                'alias': 'Eva',
                'energy': -5.5
            }
        ];

        const _result_plainify_6_2 = undefined;

        assert.deepEqual(plainify(_test_plainify_6_2), _result_plainify_6_2, 'Alice, Bob, Eva array -> undefined');

    });

    QUnit.test('plainify работает правильно со строками', function(assert) {

        const _test_plainify_7_1 = 'hello world';

        const _result_plainify_7_1 = undefined;

        assert.deepEqual(plainify(_test_plainify_7_1), _result_plainify_7_1, 'hello world -> undefined');

        const _test_plainify_7_2 = "I'm spec\nial!"

        const _result_plainify_7_2 = undefined;

        assert.deepEqual(plainify(_test_plainify_7_2), _result_plainify_7_2, "I'm spec\\nial! -> undefined");

    });

    QUnit.test('plainify работает правильно с функциями', function(assert) {

        function _test_plainify_8_1() {
            return Math.random();
        }

        const _result_plainify_8_1 = undefined;

        assert.deepEqual(plainify(_test_plainify_8_1()), _result_plainify_8_1, 'function() -> undefined');

        const _result_plainify_8_2 = undefined;

        assert.deepEqual(plainify(max([1, 2, 3])), _result_plainify_8_2, 'max([1, 2, 3]) -> undefined');

    });

    QUnit.test('plainify работает правильно с undefined и null', function(assert) {

        const _test_plainify_9_1 = undefined;

        const _result_plainify_9_1 = undefined;

        assert.deepEqual(plainify(_test_plainify_9_1), _result_plainify_9_1, 'undefined -> undefined');

        const _test_plainify_9_2 = null;

        const _result_plainify_9_2 = undefined;

        assert.deepEqual(plainify(_test_plainify_9_2), _result_plainify_9_2, 'null -> undefined');

    });

    QUnit.test('plainify работает правильно с NaN и Infinity', function(assert) {

        const _test_plainify_10_1 = NaN;

        const _result_plainify_10_1 = undefined;

        assert.deepEqual(plainify(_test_plainify_10_1), _result_plainify_10_1, 'NaN -> undefined');

        const _test_plainify_10_2 = Infinity;

        const _result_plainify_10_2 = undefined;

        assert.deepEqual(plainify(_test_plainify_10_2), _result_plainify_10_2, 'Infinity -> undefined');

    });

    QUnit.test('plainify работает правильно с тем, object, но не должно plainify\'иться', function(assert) {

        const _test_plainify_11_1 = new Boolean();

        const _result_plainify_11_1 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_1), _result_plainify_11_1, 'new Boolean() -> undefined');

        const _test_plainify_11_2 = new Number();

        const _result_plainify_11_2 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_2), _result_plainify_11_2, 'new Number() -> undefined');

        const _test_plainify_11_3 = new Date();

        const _result_plainify_11_3 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_3), _result_plainify_11_3, 'new Date() -> undefined');

        const _test_plainify_11_4 = new Array();

        const _result_plainify_11_4 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_4), _result_plainify_11_4, 'new Array() -> undefined');

        const _test_plainify_11_5 = new Function();

        const _result_plainify_11_5 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_5), _result_plainify_11_5, 'new Function() -> undefined');

        const _test_plainify_11_6 = new RegExp('test');

        const _result_plainify_11_6 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_6), _result_plainify_11_6, 'new RegExp(\'test\') -> undefined');

        const _test_plainify_11_7 = new String();

        const _result_plainify_11_7 = undefined;

        assert.deepEqual(plainify(_test_plainify_11_7), _result_plainify_11_7, 'new String() -> undefined');

    });

});
